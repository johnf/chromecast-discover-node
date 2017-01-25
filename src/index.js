import mdns from 'mdns-js';
import EventEmitter from 'events';

import Debug from 'debug';

const debug = Debug('chromecast-discover');

const MAPPINGS = {
  id: 'id',
  ve: 'version',
  md: 'model',
  ic: 'iconPath',
  fn: 'friendlyName',
  st: 'streaming',
  rs: 'appName',
  // TODO: We don't know what these are
  // rm=A390B9102AC7C3A3
  // ca=4101
  // bs=FA8FCA3C73B9
};

class ChromecastDiscover extends EventEmitter {
  constructor() {
    super();

    this.ready = false;

    const mdnsType = mdns.tcp('googlecast');

    const browser = new mdns.createBrowser(mdnsType); // eslint-disable-line new-cap
    this.browser = browser;

    // Kick off a discovery when we start up
    browser.on('ready', () => {
      debug('ready');

      this.ready = true;
    });

    browser.on('update', (data) => {
      debug('update', data);

      const type = data.type[0];
      if (type.name !== 'googlecast' || type.protocol !== 'tcp') {
        debug('skipped: not a chromecast');
        return;
      }

      // Sometimes the chromecast sends out an unsolicited record
      if (!data.txt) {
        debug('skipped: no txt record');
        return;
      }

      const device = {
        host: data.host,
        addresses: data.addresses,
        port: data.port,
        fullname: data.fullname,
      };

      const items = data.txt;
      items.forEach((item) => {
        const md = item.match(/^([^=]+)=(.*)$/);
        const key = md[1];
        const value = md[2];

        const name = MAPPINGS[key];
        if (!name) {
          return;
        }

        device[name] = value;
      });

      debug(device);

      this.emit('online', device);
    });
  }

  start() {
    const self = this;

    if (!this.ready) {
      debug('not ready');
      setTimeout(() => self.query(), 250);
      return;
    }

    debug('send discover');
    this.browser.discover();
  }
}

const chromecastDiscover = new ChromecastDiscover();

export default chromecastDiscover;
