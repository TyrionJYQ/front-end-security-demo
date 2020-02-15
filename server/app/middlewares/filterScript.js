module.exports = async (ctx,next) => {
    if(ctx.query.from) {
        ctx.query.from = ctx.query.from.replace('script','not allowed script')
    }
    await next()
}