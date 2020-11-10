const express = require("express");
const { userInfo } = require("os");

const { sequelize, User, Post } = require("./models");

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    console.log(user);
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});
app.get("/posts", async (req, res) => {
  try {
    //Every post will now have a user attached to it
    const post = await Post.findAll({ include: "user" });

    return res.json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});
app.post("/posts", async (req, res) => {
  const { body, userUuid } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({
      where: { uuid: userId },
      include: "posts",
    });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({
      where: { uuid: userId },
    });
    await user.destroy();

    return res.json({ message: "User Deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({
      where: { uuid: userId },
    });
    console.log(name, email, role)
    user.name = name
    user.email = email
    user.role = role

    await user.save()

    return res.json(user);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");
  //this looks at our models and creates db tables depending on what models we have
  //We need to pass options for it to update
  // await sequelize.sync({ alter: true });
  await sequelize.authenticate();
  console.log("Database Connected!");
});
