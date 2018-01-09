const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../templates')
const fs = require('fs')

module.exports = () => {
  
  co(function *(){
    let tplName = yield prompt('Template name is:')
    
    if(!config.tpl[tplName]){
      console.log(chalk.red('Template is not exist!'));
      process.exit()
    }else{
      config.tpl[tplName] = undefined
    }

    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if(err) console.log(chalk.red(err))
      console.log(chalk.green('Template deleted!'))
      console.log(chalk.grey('The last template is :\n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })

  })
}