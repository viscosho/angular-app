const util = require("util");
const fs = require("fs");
const path = require("path");
const child = require("child_process");
const exec = util.promisify(child.exec);
const copyFile = util.promisify(fs.copyFile);
const createDir = util.promisify(fs.mkdir);

const abCore = "ab_core.js";
const vsCode = ".vscode";
const cliArgs = process.argv.slice(2);
const appName = cliArgs[0];

async function executeCommand(cmd) {
  try {
    console.log("cliCommand: ", cmd);
    const { stdout, stderr } = await exec(cmd);
    console.log("stdout:", stdout);
    if (stderr) console.error("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}

async function createApp() {
  const cliCommand = `ng new ${appName} --inlineTemplate=true --inlineStyle=true --skipTests=true --routing --style=css`;
  await executeCommand(cliCommand);
}

async function copy(file) {
  try {
    const source = `templates/${file}`;
    const target = `${appName}/${file}`;
    console.log(`from ${source} to ${target}`);
    await copyFile(source, target, fs.constants.COPYFILE_FICLONE);
  } catch (err) {
    console.error(err);
  }
}

async function copySettings() {
  const vsCodePath = path.join(__dirname, appName, vsCode);
  await createDir(vsCodePath);
  await copy(`${vsCode}/settings.json`);
}

async function copySource() {
  await copy(`src/app/app.module.ts`);
  await copy(`src/app/app.component.ts`);
}

const prettier = ".prettierrc";
const start = async function () {
  await createApp();
  await copy(abCore);
  await copy(prettier);
  await copySettings();
  await copySource();
};

start();
