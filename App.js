


const express = require("express");
const http = require("http");
const cors = require("cors"); // Import the 'cors' package
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ExampleModel = require("./app/models/User");
require("./config/database");
const server = http.createServer(app);

const port = 8000;

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3000" , ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));





app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// defining the files and routes.

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/user-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-login.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get(`/updatethecategory/:id`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'updatethecategory.html'));
});


app.get(`/update-backend-event/:id`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'update-backend-event.html'));
});
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const UserRoutes = require("./app/routes/UserRoutes");
app.use(UserRoutes);

server.listen(port, () => {
  console.log(`App is running at port ${port}`);
});


