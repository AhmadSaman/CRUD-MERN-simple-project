const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
require("./app/routes/developer.routes")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json({ message: "welcome to Developers Application" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sever us running on port ${PORT}`);
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
