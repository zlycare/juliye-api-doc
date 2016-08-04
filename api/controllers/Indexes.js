'use strict';

var _ = require("lodash");
var util = require('../helpers/util');
var Region = require('../models/Index');

module.exports = {
  getRegions: getRegionList,
  // getHospitals: getHospitalList,
  // getDepartments: getDepartmentList,
  // getJuliyeDeptGrps: getJuliyeDeptGrps,
  // getJuliyeDepts: getJuliyeDepts
};

/**
 * 获取地区列表
 * @param req
 * @param res
 */
function getRegionList (req, res) {

  var name = req.swagger.params.name.value;
  var areaId = req.swagger.params.areaId.value;

  var cons = {
    type: {$in: [1,2]}, // 一级地区 省、市 || 二级地区 市、区
    // hospitalNum: {$gt: 0}, // 存在医院的地区
    isDeleted: {$ne: true}
  };

  if (areaId) cons.areaId = areaId;

  if (name !== undefined) cons.name = new RegExp(name);

  Region.find(cons).exec()
    .then(function (_regions) {
      _regions = JSON.parse(JSON.stringify(_regions));
      var rg1 = [];//省市
      var rg2 = [];//市区
      for (var i= 0, len = _regions.length; i < len; i++) {
        if (_regions[i].type === 1){// 省市
          _regions[i].subArea = [];
          rg1.push(_regions[i]);
        } else if(_regions[i].type === 2){ // 市区
          rg2.push(_regions[i]);
        }
      };
      var ids = _.map(rg1, '_id');//省市ID
      for (var i= 0, len = rg2.length; i < len; i++) {// 拼装省市与二级市区信息
        var index = ids.indexOf(rg2[i].provinceId);
        if (index >= 0) rg1[index].subArea.push(rg2[i]);
      };
      return res.json(rg1);
      // apiHandler.OK(res, rg1);
    }, function (err) {
      return res.json(err);
    })
};
/**
 * 获取医院列表
 * @param req
 * @param res
 */
function getHospitalList (req, res) {

  var province = req.swagger.params.province.value;
  var provinceId = req.swagger.params.provinceId.value;
  var area = req.swagger.params.area.value;
  var areaId = req.swagger.params.areaId.value;
  var pageSize = req.swagger.params.pageSize.value;
  var pageNum = req.swagger.params.pageNum.value;

  var params = {};
  var options = util.getCurrentPageSlice(req);
  var cons = {
    type: 2, // hospital
    isDeleted: {$ne: true}
  };

  !_.isNil(province)? (cons.provinceName = province):null;
  !_.isNil(provinceId)? (cons.provinceId = provinceId):null;
  !_.isNil(area)? (cons.districtName = area):null;
  !_.isNil(areaId)? (cons.districtId = areaId):null;

  Region.find(cons, params, options).exec()
    .then(function (_regions) {
        return res.json(_regions);
    }, function (err) {
        return res.json(err);
    })
};
/**
 * 获取医院列表
 * @param req
 * @param res
 */
function getDepartmentList (req, res) {
  res.json("hi")
};
/**
 * 获取医院列表
 * @param req
 * @param res
 */
function getJuliyeDeptGrps (req, res) {
  res.json("hi")
};
/**
 * 获取医院列表
 * @param req
 * @param res
 */
function getJuliyeDepts (req, res) {
  res.json("hi")
};
