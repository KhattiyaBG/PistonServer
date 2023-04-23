const db = require('../models');

const getTest = async (req, res) => {
    res.status(200).send("Test Successfully");
};

module.exports = {
    getTest,
};