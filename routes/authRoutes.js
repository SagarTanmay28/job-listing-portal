const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

router.get("/login", (req, res) => {
  res.render("auth/login")
})

router.get("/register", (req, res) => {
  res.render("auth/register")
})

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role
  })
  res.redirect("/login")
})

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.redirect("/login")

  const match = await bcrypt.compare(req.body.password, user.password)
  if (!match) return res.redirect("/login")

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
  res.cookie("token", token)

  if (user.role === "employer") {
    res.redirect("/dashboard/employer")
  } else {
    res.redirect("/dashboard/seeker")
  }
})

module.exports = router

