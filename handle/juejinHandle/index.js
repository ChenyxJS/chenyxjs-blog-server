/*
 * @Descripttion: 获取掘金数据方法类
 * @version:
 * @Author: Chenyx
 * @Date: 2022-10-20 21:29:07
 * @LastEditors: Chenyx
 * @LastEditTime: 2022-10-24 17:37:21
 */
var superagent = require("superagent");

/**
 * @Descripttion: 获取掘金前端热点数据
 * @msg:
 * @return {*}
 */
exports.getWebHotData = (req, res, next) => {
  let result;
  const url = "https://juejin.cn/post/7111718092161417229";
  // 使用superagent
  superagent
    .post(url)
    .set("X-Agent", "Juejin/Web")
    .end(function (err, res1) {
        if (res1.ok) {
          result = JSON.stringify(res1);
          console.log("yay got " + JSON.stringify(res1));
        } else {
          console.log("Oh no! error " + res1.text);
        }
        res.send(result);
      });
};
