var util = require('util');

/**
 * 获取当前要查询的分页条件
 * @param req
 * @param defaultFrom
 * @param defaultPageSize
 * @param defaultSort
 * @returns {{$slice: *[]}}
 */
exports.getCurrentPageSlice = function (req, defaultPageSize, defaultPageNum, defaultSort) {

  /** Default page size **/
  var _pageSize = (req.query.pageSize || defaultPageSize || 20);
  /** Default page from **/
  var _pageFrom = (req.query.pageNum || defaultPageNum || 0) * _pageSize;
  /** Default sort 按创建日期从小到大排列**/
  var _pagetSort = defaultSort || {'createdAt': 1};

  return {
    skip: _pageFrom,
    limit: _pageSize,
    sort: _pageSort
  };
};
