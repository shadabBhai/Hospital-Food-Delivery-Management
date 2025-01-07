const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
