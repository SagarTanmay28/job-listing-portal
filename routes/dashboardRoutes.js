const express = require("express")
const Job = require("../models/Job")

const router = express.Router()

router.get("/employer", async (req, res) => {
  const jobs = await Job.find()
  res.render("dashboard/employer", { jobs })
})

router.get("/seeker", (req, res) => {
  res.render("dashboard/seeker")
})

module.exports = router

