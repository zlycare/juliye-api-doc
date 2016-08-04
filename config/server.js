/**
 *  server
 *  服务器基本配置
 *  Created by Jacky.L on 4/16/14.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  db = "zlyweb",
  dbUrl_ut = 'mongodb://localhost/zlyweb_test',
  //dbUrl_production = 'mongodb://ZLY-MONGODB-3/'+db+',ZLY-MONGODB-2,ZLY-MONGODB-1',
  $user = process.env.UserJuliye,
  $pwd = process.env.PasswordJuliye,
  db_pre = 'mongodb://'+ $user + ':' + $pwd + '@',
  db_hosts = 'ZLY-MONGODB-1,ZLY-MONGODB-2,ZLY-MONGODB-3/',
  db_name = "zlyweb",
  db_params = '?replicaSet=zlywebRepl',
  dbUrl_production =  db_pre + db_hosts + db_name + db_params ,
  //dbUrl_production2 = 'mongodb://ZLY-MONGODB-2/',
  //dbUrl_production1 = 'mongodb://ZLY-MONGODB-1/',
  dbUrl_test = 'mongodb://ZLY-TEST/' + db,//正式:10.165.64.109
  dbUrl_local = 'mongodb://localhost/' + db,
  $mysqluser = process.env.MysqlUserJuliye,
  $mysqlpwd = process.env.MysqlPasswordJuliye,
  MYSQL_PRO_URL = "ZLY-MYSQL-1",
  MYSQL_UT_URL = "10.162.201.58",
  MYSQL_TEST_URL = "localhost",
  WX_API_URL = '10.165.64.113',
  WX_PRO_PORT = '8088',
  WX_TEST_PORT = '8188',
  UNIONPAY_API_URL = '10.165.64.113',
  UNIONPAY_PRO_PORT = '8099',
  UNIONPAY_TEST_PORT = '8199';

  NODE_ENV = process.env.NODE_ENV;

module.exports = {

  IS_PRO: NODE_ENV == 'production',
  IS_UT: NODE_ENV == 'UT',
  dbPort: 27017,
  //生产DB配置
  //dbUrl_production: 'mongodb://ZLY-DB-1/' + this.db,
  //本机开发配置
  //dbUrl_test: 'mongodb://localhost/zlyweb',

  dbUrl: NODE_ENV == 'production' ? dbUrl_production : NODE_ENV == '_test' ? dbUrl_test : dbUrl_test,
  //dbUrl2: NODE_ENV == 'production' ? dbUrl_production2 : NODE_ENV == '_test' ? dbUrl_test : dbUrl_local,
  //dbUrl1: NODE_ENV == 'production' ? dbUrl_production1 : NODE_ENV == '_test' ? dbUrl_test : dbUrl_local,
  port: 8080,
  secret: 'wecare',

  env: NODE_ENV == 'production' ? 1 : 0,// 0 测试环境, 1 生产环境

  MYSQL_URL: NODE_ENV == 'production' ? MYSQL_PRO_URL : NODE_ENV == '_test' ? MYSQL_UT_URL : MYSQL_TEST_URL,
  MYSQL_DB_NAME: "zlycare",
  MYSQL_DB_PORT: 3306,
  MYSQL_DB_USER: $mysqluser,
  MYSQL_DB_PWD:  $mysqlpwd,
  WX_API_URL: WX_API_URL,
  WX_PORT: NODE_ENV == 'production' ? WX_PRO_PORT : NODE_ENV == '_test' ? WX_TEST_PORT : WX_TEST_PORT,
  UNIONPAY_API_URL: UNIONPAY_API_URL,
  UNIONPAY_PORT: NODE_ENV == 'production' ? UNIONPAY_PRO_PORT : NODE_ENV == '_test' ? UNIONPAY_TEST_PORT : UNIONPAY_TEST_PORT,
  APPLICATIONS_ID: {
    UNKNOWN: '0',// default juliye user client
    JULIYE_USER: '1',
    JULIYE_DOCTOR: '2',
    JULIYE_BOSS: '3',
    JULIYE_DSS: '4'
  },
  JULIYE_HEADER: {
    APP_ID: "x-juliye-application-id",
    APP_VERSION: "x-juliye-application-version",
    // PHONE_VERSION : "x-juliye-application-phone-version",
    TERMINAL_PLATFORM: "x-juliye-terminal-platform",//系统信息
    TERMINAL_ID: "x-juliye-terminal-id",//终端的唯一标示
    USER_ID: "x-juliye-user-id",
    SESSION_TOKEN: "x-juliye-session-token",
    //PROFILE_ID : "x-juliye-profile-id",
    //DEVICE_MARK : "x-juliye-application-device-mark",//设备唯一标识
    DEVICE_MODEL: "x-juliye-terminal-device-model",//设备型号
    //CHANNEL_INFO : "x-juliye-application-channel",//渠道
    //PROFILE_SESSION_TOKEN : "x-juliye-profile-session-token",
    //USER_MOBILE = "x-juliye-user-mobile",
    //USER_NAME = 'x-juliye-user-name',
    PROVINCE_ID: "x-juliye-province-id",
    AREA_ID: "x-juliye-area-id"
  },
  OPEN_GET_API_REGS: {
    regs: new RegExp("/") // FIXME: Open all version 1 api
  },
  OPEN_PUT_API_REGS: {
    emchatReset: new RegExp("summaries/emchatReset")// summaries/emchatReset
  },
  OPEN_POST_API_REGS: {
    // 登陆
    exceptLogin: new RegExp("login"),//\/login/;
    // 客户登陆
    exceptLoginc: new RegExp("loginc"),///\/loginc/;
    // 医生登陆
    exceptLogind: new RegExp("logind"),///\/loginc/;
    //医生端重置密码
    changePssword: new RegExp("summary/accounts/changePwd"),
    // 申请短信验证码
    smsAuthcode: new RegExp("common/authcodes"),///\/authcodes/;;
    smsAuthCode: new RegExp("common/authCodes"),///\/authcodes/;;
    // 申请语音验证码
    voiceAuthCodes: new RegExp("common/voiceCodes"),
    // 阿里充值回调
    alipayDeposit: new RegExp("transactions/alipayDeposit"),
    // 阿里支付回调
    alipay: new RegExp("orders/alipay"),
    // 银联支付回调
    bankpay: new RegExp("transactions/callback"),
    // 微信支付回调
    wxpay: new RegExp("transactions/wxCallback"),
    // 双向回拨回调接口 挂断
    hangup: new RegExp("calls/hangup"),
    user2DoctorHangup: new RegExp('/common/calls/user2doctor/hangup'),
    // 关注医生,创建用户
    followDoctor: new RegExp('followDoctor'),
    // 查看注册申请状态
    regApplication: new RegExp('applications/reg'),
    // 重新注册申请
    reRegApplication: new RegExp('applications/reReg'),
    //发送通用短信
    commonSms: new RegExp('/common/message'),
    //好医通接口
    commonHYT: new RegExp('/common/hyt_Report'),
    // weixin 微信公众号回调 ？？？
    // weixin: new RegExp("weixin"),
    // var exceptUser = /\/user/;
    // 退出 -
    // exceptLogout: new RegExp("logout"),///\/logout/;
    // 400 服务电话
    verify: new RegExp('external/verify')
  }
};
