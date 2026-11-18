import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api{/:date}", (req, res) => {
  const { date } = req.params;

  // if no param
  if (!date) {
    const timestamp = new Date();
    return res.json(({
      unix: timestamp.getTime(),
      utc: timestamp.toUTCString(),
    }));
  }

  // is it only digits
  const parsed = /^\d+$/.test(date) ? Number(date) : date;

  // pass string to new Date
  const timestamp = new Date(parsed);

  // check if valid
  if (isNaN(timestamp.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }
  
  res.json({
    unix: timestamp.getTime(),
    utc: timestamp.toUTCString(),
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
