const Koa = require('koa');
const app = new Koa();
const chalk = require('chalk')
const static = require('koa-static')

const log = contents => {
    console.log(chalk.red(contents))
}
app.use(static(__dirname + '/public'))

app.use(async(ctx,next) => {
    log(ctx.url)
    await next()
})

app.use(static(__dirname + '/public'))

module.exports = app;