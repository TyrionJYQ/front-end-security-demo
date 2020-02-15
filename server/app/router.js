const router = require('koa-router')();
const db =require('./db/db');


router.get('/', async ctx => {
    // 获取评论
    const {username} = ctx.session;
    let res;
    if(username) {
      res = await db.r('SELECT comment FROM comments WHERE username = ?', [username])
    }
    await ctx.render('index', {
      username: ctx.session.username,
      country: ctx.query.from,
      comment: res ? res[0].comment : ''
    })
})

router.get('/login', async ctx => {
    await ctx.render('login')
})

router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  console.log(username, password)
  let sql =
   " SELECT * FROM users WHERE username = ? AND password =  " + password
  let res = await db.r(sql, [username])
  if(res && res[0]) {
    ctx.session.username = ctx.request.body.username
    ctx.redirect('/?from=china')
  }
})

router.post('/updateText', async ctx => {
  const { comment } = ctx.request.body
  const {username} = ctx.session;
  console.log(ctx.session.test)
  let ret =  await db.r('REPLACE INTO comments (username, comment) VALUES(?,?)', [username,comment])
  if(ret && ret.length === 0) {
    ctx.redirect('/?from=china')
  }
})



module.exports = router;
