const models = require("../models");

const { Domo } = models;

const makerPage = (req, res) =>
  res.render("app", { name: req.session.account.name });

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: "Both name and age are required!" });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    if (domoData.level) {
      return res
        .status(201)
        .json({ name: newDomo.name, age: newDomo.age, level: newDomo.level });
    }
    return res.status(201).json({ name: newDomo.name, age: newDomo.age });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Domo already exists!" });
    }
    return res.status(500).json({ error: "An error occured making domo!" });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select("name age").lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error retrieving domos!" });
  }
};

const ageUpDomo = async (req, res) => {
  try {
    const { id } = req.body;

    const domo = await Domo.findById(id);
    if (!domo) return res.status(404).json({ error: "Domo not found" });

    domo.age += 1;
    await domo.save();

    return res.status(200).json({ message: "Domo aged up!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to age up domo!" });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  ageUpDomo,
};
