const { MongoClient } = require("mongodb");

let dbConnection;
let uri = process.env.URI;

const connectToDb = async (cb) => {
  try {
    const client = await MongoClient.connect(uri);
    dbConnection = client.db();
    console.log("connected to db");
    return cb();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

const getDb = () => dbConnection;

module.exports = { connectToDb, getDb };
