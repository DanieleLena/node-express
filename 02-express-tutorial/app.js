const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));
//parse form dat
app.use(express.urlencoded({ extended: false }));
//parse JSON
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});
app.post("/api/insomnia/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

app.post("/login", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).send("<h1>errore</h1>");
  }
  res.status(200).send(`Welcome ${name}`);
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // let singlePerson = people.find((person) => person.id === Number(id));

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPeople });
});

app.delete('/api/people/:id', (req,res) => {
  
})

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
