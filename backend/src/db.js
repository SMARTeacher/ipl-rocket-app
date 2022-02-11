const sqlite3 = require("sqlite3").verbose();
const launchData = require("./launches.json");

let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }

  db.exec(
    "CREATE TABLE launches (id INTEGER PRIMARY KEY, missionName TEXT, rocketName TEXT, missionPatchSmall TEXT, videoLink TEXT, wikipedia TEXT, details TEXT, launchDateUnix INTEGER, launchDate TEXT, launchSiteName TEXT, launchSuccess INTEGER, upcoming INTEGER)"
  );

  launchData.data.launches.forEach((launch) => {
    db.run(
      "INSERT INTO launches (id, missionName, rocketName, missionPatchSmall, videoLink, wikipedia, details, launchDateUnix, launchDate, launchSiteName, launchSuccess, upcoming) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        launch.id,
        launch.mission_name,
        launch.rocket.rocket_name,
        launch.links.mission_patch_small,
        launch.links.video_link,
        launch.links.wikipedia,
        launch.details,
        launch.launch_date_unix,
        launch.launch_date_utc,
        launch.launch_site.site_name_long,
        launch.launch_success,
        launch.upcoming,
      ],
      (err) => {
        if (err) {
          return console.error(`${launch.id} - ${err.message}`);
        }
      }
    );
  });

  console.log("Connected to the in-memory SQlite database.");
});

module.exports = db;
