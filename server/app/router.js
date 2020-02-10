const router = require('koa-router')();

router.get('/', async ctx => {
    console.log(ctx);
    await ctx.render('index', {
       country: 'China',
       usename: 'Tang',
       comment: 'hello'
    })
})




module.exports = router;
