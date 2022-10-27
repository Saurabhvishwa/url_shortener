const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
require("./routes")(app);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
