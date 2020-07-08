const express = require("express");
const router = express.Router();

const controller = require("../controller/person.controller");

router.get("/getAll", controller.getAll);
router.get("/get/:id", controller.getById);
router.post("/create", controller.create);
router.put("/edit/:id", controller.edit);
router.delete("/remove/:id", controller.remove);
router.get("/getByName", controller.getByName);
module.exports = router;
