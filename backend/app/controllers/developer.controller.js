const db = require("../models");
const Developer = db.developers;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const developer = new Developer({
    name: req.body.name,
    description: req.body.description,
    workStatus: req.body.workStatus ? req.body.workStatus : false,
  });

  developer
    .save(developer)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Developer.",
      });
    });
};
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Developer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Developers.",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Developer.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Developer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Developer with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Developer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Developer with id=${id}. Maybe Developer was not found!`,
        });
      } else res.send({ message: "Developer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Developer with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Developer.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Developer with id=${id}. Maybe Developer was not found!`,
        });
      } else {
        res.send({
          message: "Developer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Developer with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Developer.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Developers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Developers.",
      });
    });
};
