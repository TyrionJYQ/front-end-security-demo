const app = require('./app/app');
const hack = require('./hack/app');
const chalk = require('chalk');








app.listen(9999, () => {
    console.log(chalk.green('正常网站启动成功:')+9999);
});

hack.listen(7777, () => {
    console.log(chalk.red('黑客网站启动成功:'+7777));
}); 
