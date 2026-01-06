const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  qualifications: String,
  responsibilities: String,
  location: String,
  salary: String,
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Job", jobSchema)
