const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let countRequests = 0;

server.use((req, res, next) => {
  countRequests++;
  console.log(`Número de requisições: ${countRequests}`);
  return next();
});

function checkIdExistence(req, res, next) {
  const { id } = req.params;
  const project = projects.find(proj => proj.id == id);

  if(!project) {
    return res.status(400).json({ error: "This project doesnt exists" });
  }

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: [],
  });

  return res.json(projects);
});

server.put('/projects/:id', checkIdExistence, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id = id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIdExistence, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(proj => proj.id == id);

  projects.splice(project, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkIdExistence, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);