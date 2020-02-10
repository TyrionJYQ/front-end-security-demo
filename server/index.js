const app = require('./app/app');
const hack = require('./hack/app');
const chalk = require('chalk');
const path = require('path');



// 处理静态资源多余前缀
app.use(require('./app/middlewares/staticDir'));
// 处理静态资源,path.resolve将相对路径变为绝对路径
app.use( require('koa-static-cache')(path.join(__dirname, './app/public'), {
    maxAge: 365 * 24 * 60 * 60
  }))
app.listen(9999, () => {
    console.log(chalk.green('正常网站启动成功:')+9999);
});

hack.listen(7777, () => {
    console.log(chalk.red('黑客网站启动成功:'+7777));
}); 