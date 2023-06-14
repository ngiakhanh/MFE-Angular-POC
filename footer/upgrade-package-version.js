const fs = require('fs');

let packageBuildString = fs.readFileSync('package-build.json');
let packageBuildJson = JSON.parse(packageBuildString);
let versionArray = packageBuildJson.version.split('.');
let oldSubversion = packageBuildJson.version.split('.')[2];
let newSubVersion = +oldSubversion + 1;
versionArray[2] = newSubVersion.toString();
let newVersion = versionArray.join('.');
packageBuildJson.version = newVersion;
fs.writeFileSync('package-build.json', JSON.stringify(packageBuildJson, null, "\t"));
