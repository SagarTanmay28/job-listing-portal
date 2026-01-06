const express = require("express")
const Job = require("../models/Job")

const router = express.Router()

router.get("/", async (req, res) => {
  const jobs = await Job.find()
  res.render("jobs/list", { jobs })
})

router.get("/create", (req, res) => {
  res.render("jobs/create")
})

router.post("/create", async (req, res) => {
  await Job.create(req.body)
  res.redirect("/dashboard/employer")
})

module.exports = router

