var express = require('express');
var router = express.Router();

const juejinHandle = require('../handle/juejinHandle/index')
/* GET users listing. */
router.get('/getWebHotData', juejinHandle.getWebHotData);

module.exports = router;
