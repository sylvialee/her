'use strict'
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const config = require('../templates');
const exec = require('child_process').exec;

module.exports = () => {
  co(function *(){
    let tplName = yield prompt('Template name is:');
    let projectName = yield prompt('Project name is:');
    let gitUrl
    let branch

    if(!config.tpl[tplName]){
      console.log(chalk.red('\n Template does not exit!'))
      process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    console.log(chalk.green('\n Start generating...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if(error){
        console.log(error);
        process.exit();
      }
      console.log(chalk.green('\n Generation completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}