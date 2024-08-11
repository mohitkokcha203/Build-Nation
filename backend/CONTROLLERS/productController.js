const productdb = require("../SCHEMA/productSchema");
const userDB = require("../SCHEMA/userSchema");
const { success, error } = require("../UTILS/responseWrapper");
const uniqueId = require("generate-unique-id");
const cloudinary = require("cloudinary");

// to create products ====================== ADMIN  ===========================================
const createProductController = async (req, res) => {
  try {
    const {
      title,
      image,
      description,
      price,
      old_price,
      category,
      stock,
      topPic,
    } = req.body;

    if (
      !title ||
      !image ||
      !description ||
      !price ||
      !old_price ||
      !category ||
      !stock
    ) {
      return res.send(error(400, "All fields required"));
    }

    const oldProduct = await productdb.findOne({ title });
    if (oldProduct) {
      return res.send(error(406, "Product already exist"));
    }

    const newID = uniqueId({
      length: 16,
      useLetters: false,
    });

    const cloudImg = await cloudinary.uploader.upload(image, {
      folder: "productPhoto",
    });

    const newProduct = await productdb.create({
      owner: req._id,
      product_id: newID,
      title,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.secure_url,
      },
      description,
      price,
      old_price,
      category,
      stock,
      topPic,
    });

    const product = await productdb.findOne(newProduct._id);

    const owner = await userDB.findById(req._id);
    owner.products.push(product._id);
    await owner.save();

    return res.send(success(200, { product }));
  } catch (err) {
    return res.send(error(500,err.message));
  }
};
// // to get all  created products ==========================  =======================================
const getAllProductController = async (req, res) => {
  try {
    const products = await productdb.find();
    if (!products) {
      return res.send(error(404, "Products not found"));
    }
    return res.send(success(200, { products }));
  } catch (err) {
    return res.send(error(500,err.message));
  }
};
// // to get single product  created products ==========================  =======================================

const getSingleProductController = async (req, res) => {
  try {
    const { p_id } = req.body;

    const product = await productdb.findById(p_id);
    if (!product) {
      return res.send(error(404, "Not found"));
    }

    return res.send(success(200, { product }));
  } catch (err) {
    return res.send(error(500,err.message));
  }
};

// to update  created products ========================== ADMIN =======================================
const updateProductController = async (req, res) => {
  try {
    const {
      p_id,
      title,
      image,
      description,
      price,
      old_price,
      category,
      stock,
      topPic,
    } = req.body;

    if (!p_id) {
      return res.send(406, "Product id required");
    }
    const product = await productdb.findById(p_id);
    if (!product) {
      return res.send(404, "Product Not Found");
    }
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }

    if (price) {
      product.price = price;
    }
    if (old_price) {
      product.old_price = old_price;
    }
    if (category) {
      product.category = category;
    }
    if (stock) {
      product.stock = stock;
    }
    if (topPic) {
      product.topPic = topPic;
    }
    if (image) {
      const cloudImg = await cloudinary.uploader.upload(image, {
        folder: "productsImage",
      });

      product.image = {
        publicId: cloudImg.public_id,
        url: cloudImg.secure_url,
      };
    }

    await product.save();
    return res.send(success(200, { product }));
  } catch (err) {
    return res.send(error(500,err.message));
  }
};
// // to delete  created products ========================== ADMIN =======================================
const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    currUserId = req._id;

    const product = await productdb.findById(id);
    const user = await userDB.findById(currUserId);
    if (!product) {
      return res.send(error(404, "Product not found"));
    }

    const index = user.products.indexOf(product._id);
    user.products.splice(index, 1);

    await user.save();
    await product.deleteOne();

    return res.send(success(200, "Product deleted successfully"));
  } catch (err) {
    return res.send(error(500,err.message));
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};
