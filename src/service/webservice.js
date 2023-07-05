const express = require("express");
const app = express();

const cors = require("express"); //解决跨域问题
app.use(cors());

const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 处理 mutipart/form-data
app.use(multiparty());
// 处理 application/json
app.use(bodyParser.json());
//导入我们上一步写的连接数据库的函数
const { conMysql } = require("./mysql");
//创建统一的返回报文对象
// eslint-disable-next-line no-unused-vars
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed;
    this.msg = msg;
    this.code = code;
    this.data = data;
  }
}

//查询加班/请假数据
app.post("/getOverTimes", (req, res) => {
  let sql = "select * from overtimes";

  conMysql(sql).then((result) => {
    res.send(result);
  });
});
//查询指定时间内数据
app.post("/getDatasByTimes", (req, res) => {
  const { beginTime, endTime } = req.body.params;
  let sql = `select * from overtimes where time >= '${beginTime}' and time <= '${endTime}'`;
  console.log(req.body, "查询时间参数", sql);
  conMysql(sql).then((result) => {
    res.send(result);
  });
});
//新增加班/请假数据
app.post("/addOverTimes", (req, res) => {
  // 接收普通键值对参数
  const { time, howlong1, howlong2, descrip } = req.body.params;

  let sql = `insert into overtimes(time,howlong1,howlong2,descrip) value('${time}','${howlong1}','${howlong2}','${descrip}')`;
  conMysql(sql).then((err, result) => {
    if (err) {
      console.log(err);
      res.json({ msg: "添加失败", code: 0 });
    } else {
      console.log(result);
      res.json({ msg: "添加成功", code: 1 });
    }
  });
});
//编辑
app.post("/editOverTimes", (req, res) => {
  // 接收普通键值对参数
  const { indexx, time, howlong1, howlong2, descrip } = req.body.params;
  let sql = `UPDATE overtimes SET  time = '${time}',howlong1 = '${howlong1}',howlong2 = '${howlong2}',descrip = '${descrip}' WHERE indexx = ${indexx}`;
  conMysql(sql).then((err, result) => {
    if (err) {
      console.log(err);
      res.json({ msg: "修改失败", code: 0 });
    } else {
      console.log(result);
      res.json({ msg: "修改成功", code: 1 });
    }
  });
});
//delete
app.post("/deleteOverTimes", (req, res) => {
  // 接收普通键值对参数
  const delDatas = req.body.params;
  let sql = `DELETE FROM overtimes WHERE indexx = ${delDatas}`;
  console.log(req.body.params, "req请求参数1212", sql);
  conMysql(sql).then((err, result) => {
    if (err) {
      console.log(err);
      res.json({ msg: "删除失败", code: 0 });
    } else {
      console.log(result);
      res.json({ msg: "删除成功", code: 1 });
    }
  });
  const sqlid = " ALTER TABLE overtimes AUTO_INCREMENT = 1;";
  conMysql(sqlid).then((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

//监听node服务器的端口号
app.listen(3000, () => {
  console.log("恭喜你，服务器启动成功");
});
