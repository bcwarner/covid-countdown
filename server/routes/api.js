const express = require('express');
const router = express.Router();
const path = require('path');
const exec = require('child_process');
const fs = require('fs');

dayMs = 24 * 60 * 60 * 1000;
// Make sure that our data is updated.
proj = fs.stat(path.join(__dirname, '../proj.json'), (err, stats) => {
  if (Date.now() - Date(stats.mtime) >= dayMs){
    exec("curl https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv -o vcount.csv -f");
  }
})

router.get('/proj.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../proj.json'));
});

router.get('/stat.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../stat.json'));
});

module.exports = router;