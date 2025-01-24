require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Key = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// API untuk generate key (hanya admin yang bisa akses)
app.post("/generate-key", async (req, res) => {
    const key = Math.random().toString(36).substr(2, 8).toUpperCase();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const newKey = new Key({ key, expirationDate });
    await newKey.save();

    res.json({ success: true, key });
});

// API untuk verifikasi key
app.post("/verify-key", async (req, res) => {
    const { key } = req.body;
    const foundKey = await Key.findOne({ key });

    if (!foundKey || new Date() > foundKey.expirationDate) {
        return res.json({ valid: false });
    }

    res.json({ valid: true });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
