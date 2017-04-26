# Chromecast Discover

[![Circle CI](https://circleci.com/gh/johnf/chromecast-discover-node.svg?style=svg)](https://circleci.com/gh/johnf/netflix-login-node)
[![Coverage Status](https://coveralls.io/repos/johnf/chromecast-discover-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/johnf/netflix-login-node?branch=master)

Discovers Chromecasts via mdns

## Installation

``` bash
yarn install chromecast-discover
```

## Usage

``` javascript
import chromecastDiscover from 'chromecast-discover';

chromecastDiscover.on('online', (data) => {
  console.log('Found chromecast: ', data);

});

chromecastDiscover.start();
```

## Development

After checking out the repo, run `yarn test` to run the tests.

To release a new version:

* yarn test
* yarn version
* yarn publish

This will run the tests, update the version, create a git tag for the version, push git commits and tags. Publish the module file to [npmjs.com](https://npmjs.com).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/johnf/chromecast-discover-node. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [ISC License](http://opensource.org/licenses/ISC).
