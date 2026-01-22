const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");

// Path to deploy-info.json
const deployInfoPath = path.join(__dirname, "data", "deploy-info.json");

// Function to read deploy info
function getDeployInfo() {
  const data = fs.readFileSync(deployInfoPath, "utf-8");
  return JSON.parse(data);
}

// Dashboard route
app.get("/", (req, res) => {
  const deployInfo = getDeployInfo();

  res.render("index", {
    appStatus: "UP",
    dbStatus: "UP",
    build: deployInfo.build,
    version: deployInfo.version,
    lastDeploy: deployInfo.lastDeploy
  });
});
// API: Jenkins updates deployment info
app.post("/api/deploy-info", (req, res) => {
  const { build, version } = req.body;

  if (!build || !version) {
    return res.status(400).json({
      message: "build and version are required"
    });
  }

  const newDeployInfo = {
    build: build,
    version: version,
    lastDeploy: new Date().toLocaleString()
  };

  fs.writeFileSync(
    deployInfoPath,
    JSON.stringify(newDeployInfo, null, 2)
  );

  res.json({
    message: "Deployment info updated successfully"
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
