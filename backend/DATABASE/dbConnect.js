const mongoose = require("mongoose");

const uri = `mongodb+srv://rrrahulsen9772:2P3PZ5Jn7OnQ3miF@cluster0.bcp6sgl.mongodb.net/`;

module.exports = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose
      .connect(uri)
      .then(console.log("You successfully connected to MongoDB!"));
  } catch (e) {
    // Ensures that the client will close when you finish/error
    console.log("Error to connect with DB => ", e);
    mongoose.disconnect;
  }
};
