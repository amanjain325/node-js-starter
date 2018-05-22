const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "aman1" },
  { id: 2, name: "aman2" },
  { id: 3, name: "aman3" }
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Not found");
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body); // result.error = error
  if (error) {
    return res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Not found");
  }
  const { error } = validateCourse(req.body); // result.error = error
  if (error) {
    return res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Not found");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
