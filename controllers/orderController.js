const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const { userId, address, paymentType, items, userName } = req.body;

        if (!userId || !address || !paymentType || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'userId, address, paymentType and items are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const productIds = items.map(i => i.product);
        const products = await Product.find({ _id: { $in: productIds } });
        const prodMap = products.reduce((map, p) => {
            map[p._id] = p;
            return map;
        }, {});

        const orderItems = items.map(i => {
            const prod = prodMap[i.product];
            if (!prod) {
                throw new Error(`Product with id ${i.product} not found.`);
            }
            return {
                name: i.name,
                category: i.category,
                imageUrl: i.imageUrl,
                product: i.product,
                quantity: i.quantity,
                price: prod.price,
            };
        });

        const totalPrice = orderItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

        const order = new Order({
            userName,
            user: userId,
            items: orderItems,
            totalPrice,
            address,
            paymentType,
        });
        await order.save();

        await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        if (err.message.startsWith('Product with id')) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error while creating order.' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error while retrieving user orders.' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error while retrieving order.' });
    }
};

exports.deleteUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await Order.deleteMany({ user: userId });
        await User.findByIdAndUpdate(userId, { $set: { orders: [] } });
        res.status(200).json({
            message: 'Order history deleted successfully.',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting order history:', error);
        res.status(500).json({
            message: 'Internal server error while deleting order history.',
            error: error.message,
        });
    }
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const result = await Order.deleteOne({ _id: orderId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({
            message: 'Order deleted successfully.',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({
            message: 'Internal server error while deleting order.',
            error: error.message,
        });
    }
};
