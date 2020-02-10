const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const render = require('koa-art-template');
const path = require('path')
const logger = require('./middlewares/logger')
const statiDir = require('./middlewares/staticDir')
// handler request body
app.use(bodyParser());



// koa-art-template
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

// logger
app.use(logger)


// request
app.use(async (ctx, next) => {
    await next()
    // 参数出现在HTML内容或属性浏览器会拦截
    // ctx.set('X-XSS-Protection', 0)
    // ctx.set('Content-Security-Policy', "default-src 'self'")
    // ctx.set('X-FRAME-OPTIONS', 'DENY')
    // const referer = ctx.request.header.referer
    // console.log('Referer:', referer)

    // const referer = ctx.request.header.referer
    // console.log('Referer:', referer)

})


app.use(router.routes());
app.use(router.allowedMethods());


// app.listen(9999, () => {
//     console.log('正常网站启动成功:'+9999);
// });

module.exports = app;