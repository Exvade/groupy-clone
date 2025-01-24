const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const keySchema = new mongoose.Schema({
    key: String,
    expirationDate: Date,
});

const Key = mongoose.model("Key", keySchema);

module.exports = Key;
