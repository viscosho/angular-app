const util = require('util');
const fs = require('fs');
const copyFile = util.promisify(fs.copyFile);
const exec = util.promisify(require('child_process').exec);
const cliArgs = process.argv.slice(2);
const entityName = cliArgs[0];

async function executeCommand(cmd) {
  try {
    console.log('cliCommand: ', cmd);
    const { stdout, stderr } = await exec(cmd);
    console.log('stdout:', stdout);
    if (stderr) console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  }
}

async function createModule(name) {
  const cliCommand = `ng g m ${name} -m app.module.ts`;
  await executeCommand(cliCommand);
}

async function createComponent(module, name) {
  const cliCommand = `ng g c ${module}/${name} --export --flat`;
  await executeCommand(cliCommand);
}

async function createRoute(name) {
  const cliCommand = `ng g m ${name} --route=${name} -m app-routing.module.ts`;
  await executeCommand(cliCommand);
}

async function createRouteWithService(name) {
  await createRoute(name);
  const cliCommand = `ng g s ${name}/api`;
  await executeCommand(cliCommand);
}

async function createCrud(name) {
  await createRouteWithService(name);
  let cliCommand = `ng g c ${name}/${name}-new --inlineTemplate=false`;
  await executeCommand(cliCommand);
  cliCommand = `ng g c ${name}/${name}-list --inlineTemplate=false`;
  await executeCommand(cliCommand);
}

async function lint() {
  await executeCommand('npm run lint');
}

function setScript(name, script) {
  let rawPackage = fs.readFileSync('package.json');
  let package = JSON.parse(rawPackage);
  package.scripts[name] = script;
  let data = JSON.stringify(package);
  fs.writeFileSync('package.json', data, {});
}

async function format() {
  await executeCommand('npm install prettier tslint-config-prettier -D');
  await executeCommand('code --install-extension johnpapa.angular-essentials');
  setScript('format', 'prettier --write ./src');
  await executeCommand('npm run format');
}

async function startApp() {
  setScript('start', 'ng serve -o --port 4290');
  await executeCommand('npm ng analytics project off');
}

async function copy(file) {
  try {
    const source = `../templates/${file}`;
    const target = `${file}`;
    console.log(`from ${source} to ${target}`);
    await copyFile(source, target, fs.constants.COPYFILE_FICLONE);
  } catch (err) {
    console.error(err);
  }
}

async function copyLayout() {
  await copy(`src/app/layout/header.component.ts`);
  await copy(`src/app/layout/footer.component.ts`);
}

const start = async function () {
  await createModule('layout');
  await createComponent('layout', 'header');
  await createComponent('layout', 'footer');
  await createModule('shared');
  await createModule('home');
  await createComponent('home', 'home');
  await createRoute('about-us');
  await createCrud(entityName);
  await createRoute('auth');
  await copyLayout();
  await lint();
  await format();
  await startApp();
};

start();
