 // import express, { application } from "express";
// import path from "path";
// import mongoose from "mongoose";
// import Razorpay from "razorpay";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

const express = require("express");
const path = require("path");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// const connectDB = require("./config/db");
// connectDB();

// mongodb+srv://akhilesh902830:akhilesh@12345@cluster1.vfxuhhg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1

mongoose
  .connect(
    // "mongodb://127.0.0.1:27017/?directConnection=true0&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5",
    // "mongodb://127.0.0.1:27017/mydataa",
    "mongodb+srv://akhilesh902830:akhilesh12345@cluster1.vfxuhhg.mongodb.net/dattttaaa?retryWrites=true&w=majority&appName=Cluster1"

    // {
    //   dbName: "mydataaaa",
    // }
  )
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// const msg = mongoose.model("Message", newSchema);

const newSchemas = new mongoose.Schema({
  // paymentId: String,
  // status: String,
  Bus_id: Number,
  Date: String,
  Price: Number,
  Tickets: Number,
  Start: String,
  End: String,
});

const msg = mongoose.model("ticketsdT", newSchemas);

// data = {
//   order_id: "welcome",
// };
// msg.insertMany([data]);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("helllllllllllllllllooo");
});

app.get("/dailyPass.html", async (req, res) => {
  console.log("heey");
  res.render("dailyPass");
  // datt = document.querySelector(".upFair");
  // console.log(datt.innerText);
});

app.use(express.static(path.join(path.resolve(), "public"))); //to serve the public folder which is static
// app.use(express.urlencoded({extended:true}));                    //to access data from the form
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
const user = [];

const razorpay = new Razorpay({
  key_id: "rzp_test_xC9FgyFJ26fqQo", // Replace with your Razorpay Key ID
  key_secret: "krFgGaHwIte0MmnQCjn6MRn6",
});

// app.get('/',(req,res)=>{
//     res.render("index",{name:"Singh"});
// const pathlocation=path.resolve();
// res.sendFile(path.join(pathlocation,"./index.html"));
// })

// app.get("/add",async (req,res)=>{
//     await msg.create({name:"ashu1",email:"sampl2e@gmail.com"})
//     res.send("Nice");
// })

app.get("/success", (req, res) => {
  res.render("success");
});
app.post("/contact", async (req, res) => {
  // console.log(req.body.name);
  console.log("my name is contact!");
  await msg.create({ name: req.body.name, email: req.body.email });
  res.redirect("/about_us");
});

app.post("/payment", async (req, res) => {
  // let { amount } = req.body;

  // var instance = new Razorpay({ key_id: 'rzp_test_x9uLgNMPfHCfBD', key_secret: 'zhCXxxloLeozgaUdt2JoCUiz' });

  // let order=await instance.orders.create({
  //     amount:amount*100,
  //     currency:"INR",
  //     receipt:"receipt#1",
  // })
  // res.status(201).json({
  //     success:true,
  //     order,
  //     amount,
  // });
  const { amount, currency, receipt, payment_capture } = req.body;

  const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: receipt || "receipt_order_id",
    payment_capture: payment_capture || 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    const orderId = response.id; // Extract the order ID from the response
    res.json({ orderId });

    console.log("payment is done");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in creating Razorpay order");
    // res.redirect("/dailyPass");
  }
});

app.post("/razorpay/success", async (req, res) => {
  const paymentData = req.body;
  console.log("hello");
  // Save payment data to MongoDB
  const newPayment = new Payment({
    razorpay_payment_id: paymentData.razorpay_payment_id,
    amount: paymentData.amount,
    // Add other required fields
  });

  await newPayment.save();

  res.json({ success: true });
});

// payment verification

// app.post("/paymentverification", async (req, res) => {
//   const { order_id, payment_id, signature } = req.body;
//   // const body=order_id+"|"+payment_id;
//   await Payment.create({
//     order_id,
//     payment_id,
//   });
// });

app.get("/users", (req, res) => {
  res.json({
    user,
  });
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index.html", (req, res) => {
  res.render("index");
});
app.get("/about_us.html", (req, res) => {
  res.render("about_us");
});
app.get("/help2.html", (req, res) => {
  res.render("help2");
});
app.get("/dailyPass.html", (req, res) => {
  res.render("dailyPass");
});
app.get("/confirm_booking.html", (req, res) => {
  res.render("confirm_booking");
});
app.get("/bookTicketnew.html", (req, res) => {
  res.render("bookTicketnew");
});

// app.post("/passTicket", (req, res) => {
//   try {
//     const orderid_data = req.body.bus_id;
//     console.log("Order ID data:", orderid_data); // Check if orderid_data is received correctly

//     // Rest of your code to insert data into MongoDB

//     res.redirect("/passTicket.html"); // Redirect to the passTicket.html page after successful insertion
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/passTicket.html", (req, res) => {
  res.render("passTicket");
  console.log("Hellloooo");

  // orderid_data = req.body.bus_id;

  // data = {
  //   order_id: orderid_data,
  // };

  // msg.insertMany([data]);
  // console.log(orderid_data);
});

app.get("/normalTicket.html", (req, res) => {
  res.render("normalTicket");
});

app.get("/route1.html", (req, res) => {
  res.render("route1");
});
app.get("/route2.html", (req, res) => {
  res.render("route2");
});
app.get("/route3.html", (req, res) => {
  res.render("route3");
});
app.get("/route4.html", (req, res) => {
  res.render("route4");
});
app.get("/route5.html", (req, res) => {
  res.render("route5");
});

app.listen(port, () => {
  console.log("Server is working");
});
  
app.post("/passTicket", async (req, res) => {
  console.log("hsdfhsadfashjfd");
  const { ticc, iiddd, prrr } = req.body;
  console.log(ticc);
  console.log(iiddd);
  console.log(prrr);

  const currentDate = new Date();

  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(dateString);

  data = {
    Bus_id: iiddd,
    Date: dateString,
    Price: prrr,
    Tickets: ticc,
  };

  msg.insertMany([data]);
});

app.post("/normalTicket", async (req, res) => {
  console.log("hsdfhsadfashjfd");
  const { ticc, iiddd, prrr, start, end } = req.body;
  console.log(ticc);
  console.log(iiddd);
  console.log(prrr);

  const currentDate = new Date();

  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(dateString);

  data11 = {
    Bus_id: iiddd,
    Date: dateString,
    Price: prrr,
    Tickets: ticc,
    Start: start,
    End: end,
  };

  msg.insertMany([data11]);
});
