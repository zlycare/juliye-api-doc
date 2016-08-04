'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
app.use(function(options){
  console.log("beging......");
  return function (req, res, next){
    console.log("loading cros middleware");
    // 监听res回调header方法
    //res.on('header', function () {
      console.log("on header call");
      // 更新client session
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Client-Session');
      res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //});
    next();
  }
}());
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
