module.exports = async (ctx, next) => {
    console.log('request url: ' + ctx.request.url + "; request method:" + ctx.request.method +  "; time: " + new Date());
    await next()
}