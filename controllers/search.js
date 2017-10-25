const config = require('../config');

exports.index = function (req, res, next) {
  let q = req.query.q;
  q = encodeURIComponent(q);
  res.redirect(`https://www.baidu.com/s?wd=${q}%20site:${config.host}`);
};
