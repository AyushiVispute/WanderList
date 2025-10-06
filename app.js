require('dotenv').config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

console.log("Database URL:", DB_URL);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
