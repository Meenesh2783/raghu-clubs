const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Event = require("./schemas/eventSchema.js");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the dB");
  })
  .catch(() => {
    console.log("connection failed");
  });

/**
 * in ES version
 * import express, { json } from "express";
import { connect } from "mongoose";
const dotenv = require("dotenv").config();

const app = express();
app.use(json());

connect(process.env.MONGO_URI);
 */

app.listen(3000, () => console.log("Server running"));

//this api gets all the events from db(admin)
app.get("/api/events", async (req, res) => {
  try {
    const event = await Event.find({});
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//this api gets id-specified event from db(admin)
app.get("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//this api creates an event(admin)
app.post("/api/events", async (req, res) => {
  //console.log(req.body);
  //res.send(req.body);
  try {
    const event = await Event.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a product
app.put("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body);
    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }
    const updatedevent = await Event.findById(id);
    res.status(200).json(updatedevent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
