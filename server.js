const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./model");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://mohini:mohinimohini@cluster0.sqdke.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error" + err));

app.get("/getusers", async (req, res) => {
  try {
    return res.json(await UserSchema.find());
  } catch (err) {
    console.log(err);
  }
});

app.post("/adduser", async (req, res) => {
  const { name } = req.body;
  try {
    const newData = new UserSchema({
      name: name,
    });
    await newData.save();
    return res.json(await UserSchema.find());
  } catch (err) {
    console.log(err);
  }
});
app.delete("/deleteuser/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const getUsers = res.json(
      await UserSchema.findByIdAndDelete(req.params.id)
    );
    return res.json(await UserSchema.find());
  } catch (err) {
    console.log(err);
  }
});
app.put("/updateuser/:id", async (req, res) => {
  const { name } = req.body;
  try {
    const updateUser = res.json(
      await UserSchema.findByIdAndUpdate(req.params.id, { name: name })
    );
    // await updateUser.save();
    return res.json(await UserSchema.find());
  } catch (err) {
    console.log(err);
  }
});
app.listen(5000, () => console.log("Server Runnig on port 5000"));
