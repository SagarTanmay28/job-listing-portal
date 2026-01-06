const express = require("express")
const Application = require("../models/Application")

const router = express.Router()

router.post("/apply", async (req, res) => {
  await Application.create(req.body)
  res.redirect("/dashboard/seeker")
})

module.exports = router
