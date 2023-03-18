const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./model/student");

app.use(express.json());
//json solve updated
app.use(express.urlencoded({ extended: false }));

const port = 3000;
app.get("/", (req, res) => {
  res.send("hello world!");
  console.log("hello")
});

app.get("/hello", (req, res) => {
  res.send("hello world! amine how are you?");
});
/////////////get student by id
app.get("/student:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.statusCode(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/////// fetch a new student

app.get("/student", async (req, res) => {
  try {
    const students = await Student.find({});
    res.statusCode(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/////// create a new student

app.post("/student", async (req, res) => {
  // console.log(req.body)
  // res.send(req.body);

  try {
    const student = await Student.create(req.body);
    res.statusCode(200).json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//update

app.put("/student:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);
    // no student found
    if (!student) {
      return res
        .status(404)
        .json({ message: `can't find student with this id:${id} ` });
    }
    const updatedStudent = await student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete student

app.delete("/student:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id, req.body);
    // no student found
    if (!student) {
      return res
        .status(404)
        .json({ message: `can't find student with this id:${id} ` });
    }

    res.status(200).json(Student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://aminos:14072004blida@cluster0.9jltetv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected db");
    app.listen(port, () => {
      console.log("server listening on port");
    });
  })
  .catch((err) => console.log("error connecting"));