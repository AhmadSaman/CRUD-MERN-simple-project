var bodyParser = require("body-parser");
const cors = require("cors");
module.exports = (app) => {
  const developers = require("../controllers/developer.controller.js");
  var router = require("express").Router();

  router.post("/", bodyParser.json(), developers.create);

  router.get("/", developers.findAll);

  router.get("/:id", developers.findOne);

  router.put("/:id", bodyParser.json(), developers.update);

  router.delete("/:id", developers.delete);

  router.delete("/", developers.deleteAll);
  const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use("/api/developers", router);
};
