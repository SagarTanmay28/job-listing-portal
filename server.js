const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")
const cookieParser = require("cookie-parser")

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

mongoose.connect(process.env.MONGO_URI)

app.use("/", require("./routes/authRoutes"))
app.use("/jobs", require("./routes/jobRoutes"))
app.use("/dashboard", require("./routes/dashboardRoutes"))

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(process.env.PORT || 5000)

