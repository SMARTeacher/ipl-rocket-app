const db = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/launches", (req, res) => {
  db.all("SELECT * FROM launches", (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ data: rows });
    }
  });
});

app.put("/launches/:launchId", (req, res) => {
  db.run("UPDATE launches SET rocketName = ? WHERE id = ?", [req.body.rocketName, req.params.launchId]);

  return res.json({ message: "Successfully updated rocket name." });
});

app.listen(4000, () => console.log("Rocket backend is listening on port 3000."));
