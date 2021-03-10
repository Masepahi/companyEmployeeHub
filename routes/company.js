const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Company = require("../models/company");


router.get("/companiesPage", (req, res) => {
  Company.find({}, (err, companies) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.render("company", { companies });
  });
});


router.get("/:id", (req, res) => {
  Company.find({_id: req.params.id}, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.send(company);
  });
});


router.post("/", (req, res) => {
  const newCompany = new Company({
    userName: req.body.userName,
    city: req.body.city,
    state: req.body.state,
    contactNumber: req.body.contactNumber,
    registrationNumber: Math.floor(Math.random() * 9999999 + 1000000),
  });
  console.log(req.body);
  console.log(req.query);
  console.log(newCompany);
  newCompany.save((err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.redirect('/company/companiesPage');
  });
});

router.put('/updateCompany/:id', (req, res) => {

  Company.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, company) => {
      if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
      res.json(company);
  })
});

router.delete('/deleteCompany/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  Company.findOneAndDelete({_id: req.params.id}, (err, company) => {
      if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
      res.json({company, msg: "success"});
  })
});

module.exports = router;
