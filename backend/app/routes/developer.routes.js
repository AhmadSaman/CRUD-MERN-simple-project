module.exports = (app) => {
  const developers = require("../controllers/developer.controller.js");
  var router = require("express").Router();

  router.post("/",  developers.create);

  router.get("/", developers.findAll);

  router.get("/:id", developers.findOne);

  router.put("/:id",  developers.update);

  router.delete("/:id", developers.delete);

  router.delete("/", developers.deleteAll);
  app.use("/api/developers", router);
};
