const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const render = require('koa-art-template');
const path = require('path')

// handler request body
app.use(bodyParser());


// koa-art-template
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

// logger
app.use(async (ctx, next) => {
    console.log('request url: ' + ctx.request.url + "; request method:" + ctx.request.method +  "; time: " + new Date());
    await next()
   

})

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

module.exports = app;