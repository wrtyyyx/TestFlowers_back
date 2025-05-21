const Product = require('../models/Product');
const { request } = require('express');

exports.getAll = async (req, res) => {
    const { page = 1, limit = 10, category, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(+limit);

    res.json(products);
};

exports.getOne = async (req, res) => {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Not found' });
    res.json(prod);
};
exports.create = async (req, res) => {
    const newProd = new Product(req.body);
    await newProd.save();
    res.status(201).json(newProd);
};

exports.getByCategory = async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({category});
    return res.json(products);
};

exports.remove = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
};