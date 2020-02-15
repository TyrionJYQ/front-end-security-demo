const sqlite3 = require('sqlite3')
const db =  new sqlite3.Database('../test2.db', err => {
    if(err) {
        console.log(err)
    }
    console.log("数据库连接成功")
});
let obj={}
obj.r = (sql,params) => {
    console.log(db)
    return new Promise((res,rej) => {
        db.all(sql, params, (err, data) => {
            console.log("开始执行数据查询处理", sql, JSON.stringify(params));
            if (err) {
              console.error("执行数据查询处理异常", err.stack);
              rej({ erroMsg: err.stack });
            }
            // 数据库操作成功返回查询到的data值
            console.log("执行数据查询结束，结果:%s", JSON.stringify(data));
            res(data);
        });
    })
    
}

module.exports = obj;


