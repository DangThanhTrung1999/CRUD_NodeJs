const Person = require("../models/person.model");

module.exports = {
  getAll: async (req, res) => {
    let { page, limit } = req.query;
    let persons = await Person.find();
    let totalRows = persons.length;
    if (page && limit) {
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      persons = persons.slice(startIndex, endIndex);
      res.json({
        persons,
        pagination: {
          page,
          limit,
          totalRows,
        },
      });
      return;
    }

    res.json({
      persons,
      pagination: {
        page,
        limit,
        totalRows,
      },
    });
  },
  getById: async (req, res) => {
    let person = await Person.findById(req.params.id);
    res.json({
      person,
      success: "ok",
    });
  },
  create: async (req, res) => {
    let person = await Person.create(req.body);
    res.json({
      success: "ok",
      person,
    });
  },
  edit: async (req, res) => {
    // let person = await Person.findByIdAndUpdate(
    //   { _id: req.params.id },
    //   { $set: req.body }
    // );
    let person = Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err, response) => {
        if (err)
          res.json({
            message: "Error in updating person with id " + req.params.id,
          });
        res.json(response);
      }
    );
  },
  remove: (req, res) => {
    Person.findByIdAndRemove(req.params.id, (err, response) => {
      if (err) res.json({ message: "Have error in process delete" });
      res.json({
        message: `Delete person with ${req.params.id} success`,
      });
    });
  },
};
