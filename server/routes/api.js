const express = require('express');
const router = express.Router();
const path = require('path');
const exec = require('child_process');
const fs = require('fs');

// Make sure that our data is updated.
function update (){
  proj = fs.stat(path.join(__dirname, '../vcount.csv'), (err, stats) => {
    if ((new Date()).getHours() != stats.mtime.getHours()){
      console.log("updated");
      exec.exec("curl https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv -o vcount.csv -f", { cwd: path.join(__dirname, '..') });
      exec.exec("python3 data.py", { cwd: path.join(__dirname, '..') });
    }
  });
}
router.get('/proj.json', (req, res) => {
  update();
  res.sendFile(path.join(__dirname, '../proj.json'));
});

router.get('/stat.json', (req, res) => {
  update();
  res.sendFile(path.join(__dirname, '../stat.json'));
});

module.exports = router;