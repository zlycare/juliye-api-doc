/**
 *  mongodb configs
 *  文档数据库基本配置
 *  Created by Jacky.L on 4/16/14.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var mongoose = require('mongoose');
var settings = require('./server');
//var
//logger = require('./logger'),
//filename = 'db.js';

mongoose.connect(settings.dbUrl);
//mongoose.connect("mongodb://ZLY-MONGODB-3/zlyweb,ZLY-MONGODB-2,ZLY-MONGODB-1");
var connection = mongoose.connection;

connection.on('error', function (err) {
  console.log('Connection to mongodb error: ' + err + '  :  ' + settings.dbUrl);
  //logger.log(logger.categorys.INIT, logger.levels.FATAL, filename,
  //  'Connection to mongodb error: ' + err + '  :  ' + settings.dbUrl);
});

connection.once('open', function () {
  console.log('Connect to mongodb sucessfully ' + settings.dbUrl);
  //logger.log(logger.categorys.INIT, logger.levels.DEBUG, filename,
  //  'Connect to mongodb sucessfully ' + settings.dbUrl);
});

if (!settings.IS_UT) mongoose.set('debug', true);

exports.mongoose = mongoose;
