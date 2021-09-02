const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true }).sort("-name");
  res.status(200).json({ products });
};
const getAllProducts = async (req, res) => {
  const { featured, name,sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = feature === "true" ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    //the "i" means Case insensitivity, the $regex research all the patter
    //contains in the name(es: name = a, find all the products with contains a in the ///name)
  }
  const product = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" "); //because the sort method need a   list with a space betweeen paramns and NOT a comma
    result = result.sort(sortlist);
    // products = products.sort();
  }

  res.status(200).json({ product });
};

module.exports = { getAllProductsStatic, getAllProducts };
