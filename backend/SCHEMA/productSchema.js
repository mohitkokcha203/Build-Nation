const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersDB",
      require: true,
    },
    product_id: {
      type: Number,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      publicId: String,
      url: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    topPic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
