const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template');
const path = require('path')
const router = require('./router')
const logger = require('./middlewares/logger')

const filterScript = require('./middlewares/filterScript')
// handle static assets
app.use(require('koa-static')(path.resolve('./app/public')))
app.keys = ['some secret hurr'];

// handler request body
app.use(bodyParser());


const CONFIG = {
    key: 'kaikeba:sess',
    /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: false,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: false,
    /** (boolean) httpOnly or not (default true) */
    signed: false,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));

// koa-art-template
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});


// 过滤script脚本
// app.use(filterScript)

// logger
app.use(logger)



// request
app.use(async (ctx, next) => {
   //参数出现在HTML内容或属性浏览器会拦截
   
    ctx.set('X-XSS-Protection', 0)
    // ctx.set('Content-Security-Policy', "default-src 'self'")
    // ctx.set('X-FRAME-OPTIONS', 'DENY')
    // const referer = ctx.request.header.referer
    // console.log('Referer:', referer)

    // const referer = ctx.request.header.referer
    // console.log('Referer:', referer)
    await next()
    

})


app.use(router.routes());
app.use(router.allowedMethods());


// app.listen(9999, () => {
//     console.log('正常网站启动成功:'+9999);
// });

module.exports = app;