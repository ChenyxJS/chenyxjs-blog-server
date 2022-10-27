/*
 * @Descripttion: 文章信息
 * @version: 
 * @Author: Chenyx
 * @Date: 2022-10-21 23:52:33
 * @LastEditors: Chenyx
 * @LastEditTime: 2022-10-22 00:31:05
 */
var express = require('express');
var router = express.Router();

var articleHandle = require('../handle/articleHandle/index')


router.get('/getArticleList',articleHandle.getArticleList)


module.exports = router