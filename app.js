const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const app = express();
app.use(express.json());
const path = require("path");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// db connection
let db;
let port = process.env.PORT || 3000;

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
    db = getDb();
  }
});

// routes
app.get("/modele", (req, res) => {
  let modele = [];

  db.collection("modele")
    .find()
    .sort({ author: 1 })
    .forEach((item) => modele.push(item))
    .then(() => {
      res.status(200).json(modele);
    })
    .catch(() => {
      res.status(500).json({ msg: "could not fetch the document", err });
    });
});

app.post("/modele", (req, res) => {
  const item = req.body;

  db.collection("modele")
    .insertOne(item)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.delete("/modele/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("modele")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});

app.patch("/modele/:id", (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("modele")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});
