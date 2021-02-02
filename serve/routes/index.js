var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.json({
   message:"success"
 })
});

/**
 * 切片上传
 */
router.get('/zone', function(req, res, next) {
  res.json({
    message:res.body
  })
});

module.exports = router;
