module.exports = async (ctx,next) => {
    console.log(ctx.url)
    if(ctx.url.match('/public')) {
        ctx.url = ctx.url.replace('/public', '')
    }

    await next()
}