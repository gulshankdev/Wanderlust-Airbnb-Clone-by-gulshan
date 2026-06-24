require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "695eb46ab6598b1c46f41ec5"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
};

main()
    .then(() => {
        console.log("connected to DB");
        initDB();
    })
    .catch((err) => {
        console.log(err);
    });
