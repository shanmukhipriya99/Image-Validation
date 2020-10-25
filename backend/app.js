//Importing packages
const express = require("express");
const cors = require("cors");
require("./database/db");

const app = express();
const port = process.env.PORT || 8080;

//Importing routes
const cert = require("./routes/cert");
const college = require("./routes/college");
const validate = require("./routes/validate");

//Importing middleware
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cert);
app.use(college);
app.use(validate);

//Listening...
app.listen(port, () => {
    console.log("Serving on port " + port);
}); 
