'use strict';

exports.__esModule = true;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/

var debug = new _debug2.default('react-google-charts:GoogleChartLoader');
var script = typeof window !== 'undefined' ? require('scriptjs') : function (link, callback) {
  return callback();
};

var googleChartLoader = {
  isLoaded: false,
  isLoading: false,
  initPromise: {},
  init: function init(packages, version, mapsApiKey) {
    var _this = this;

    debug('init', packages, version);
    if (this.isLoading || this.isLoaded) {
      return this.initPromise;
    }
    this.isLoading = true;
    this.initPromise = new _bluebird2.default(function (resolve) {
      script('https://www.gstatic.com/charts/loader.js', function () {
        window.google.charts.load(version || 'current', { packages: packages || ['corechart'], mapsApiKey: mapsApiKey });
        window.google.charts.setOnLoadCallback(function () {
          debug('Chart Loaded');
          _this.isLoaded = true;
          _this.isLoading = false;
          resolve();
        });
      });
    });
    return this.initPromise;
  }
};

exports.default = googleChartLoader;
module.exports = exports['default'];