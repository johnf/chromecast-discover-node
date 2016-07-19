'use strict';

var mdns = require('mdns-js');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var debug = require('debug')('chromecast-discover');

var MAPPINGS = {
  id: 'id',
  ve: 'version',
  md: 'model',
  ic: 'iconPath',
  fn: 'friendlyName',
  // TODO: We don't know what these are
  // rm=A390B9102AC7C3A3
  // ca=4101
  // st=0
  // bs=FA8FCA3C73B9
  // rs=
};

var ChromecastDiscover = function() {
  var self = this;

  var mdnsType = mdns.tcp('googlecast');

  var browser = new mdns.createBrowser(mdnsType);
  this.browser = browser;

  // Kick off a discovery when we start up
  browser.on('ready', function () {
    debug('ready');

    debug('initial query');

    browser.discover();
  });

  browser.on('update', function (data) {
    debug('update', data);

    var type = data.type[0];
    if (type.name !== 'googlecast' || type.protocol !== 'tcp') {
      debug('skipped: not a chromecast');
      return;
    }

    // Sometimes the chromecast sends out an unsolicited record
    if (! data.txt) {
      debug('skipped: no txt record');
      return;
    }

    var device = {
      host: data.host,
      addresses: data.addresses,
      port: data.port,
      fullname: data.fullname,
    };

    var items = data.txt;
    for (let item of items) {
      var md = item.match(/^([^=]+)=(.*)$/);
      var key = md[1];
      var value = md[2];

      var name = MAPPINGS[key];
      if (!name) {
        continue;
      }

      device[name] = value;
    }

    debug(device);

    self.emit('online', device);
  });
};

ChromecastDiscover.prototype.query = function() {
  debug('send discover');
  this.browser.discover();
};

util.inherits(ChromecastDiscover, EventEmitter);

module.exports = new ChromecastDiscover();
