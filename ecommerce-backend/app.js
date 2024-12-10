const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("Server is ready");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
