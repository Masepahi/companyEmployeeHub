const express = require("express");
const router = express.Router();
const Employees = require("../models/employees");
const Company = require("../models/company");


router.get("/", (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employees);
  });
});

router.get("/findOne/:id", (req, res) => {
  Employees.find({_id: req.params.id}, (err, employee) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.send(employee);
  });
});


router.get("/companyEmployees/:id", (req, res) => {
  Company.find({_id: req.params.id}, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    let targetCompany;
    for (let i = 0; i < company.length; i++) {
      targetCompany = company[i].userName;
    };
    let findEmployees = {company: targetCompany}
    Employees.find(findEmployees, (err, employees) => {
      if (err)
        return res.status(500).json({ msg: "Server Error :)", err: err.message });
        console.log(employees);
      res.send(employees);
    });
  });
});


router.post("/createEmployee", (req, res) => {
  Company.find({userName: req.body.company}, (err, company) => {
    if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
    if (!company) return res.status(404).json({msg: "Not Found :)"})
  });
  
  const newEmployee = new Employees({
    name: req.body.name,
    familyName: req.body.familyName,
    nationalCode: req.body.nationalCode,
    sex: req.body.sex,
    age: req.body.age,
    company: req.body.company,
    isAdmin: req.body.isAdmin,
  });
  
  newEmployee.save((err, employee) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employee);
  });
});


router.put('updateEmployee/:id', (req, res) => {
  Employees.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, employee) => {
      if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
      res.json(employee);
  })
});

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  Employees.findOneAndDelete({_id: req.params.id}, (err, Employee) => {
      if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
      res.json({Employee, msg: "success"});
  })
});


router.get('/age', (req, res) => {
  Employees.find({ 'age' : { '$gt' : 20 , '$lt' : 30 } }, (err, Employee) => {
      if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
      res.json({Employee, msg: "success"});
  })
});

router.get('/admin', (req, res) => {
  Employees.find({ 'isAdmin' :  true  }, (err, Employee) => {
      if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
      res.json({Employee, msg: "success"});
  })
});



module.exports = router;