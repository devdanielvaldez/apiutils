# ApiUtils

A comprehensive utility library for building and enhancing APIs in Node.js.

## Installation

This is a Node.js module available through the npm registry. Before installing, download and install [Node.js](https://nodejs.org/en/download/). Node.js 14 or higher is required.

If this is a new project, make sure to create a `package.json` first with the `npm init` command.

Installation is done using the npm install command:

```bash
$ npm install apiutils.js
```

## Features

- **Token Generation & Manage**: Easy, fast and secure creation of tokens with high security standards for your API.
- **Password Manage**: Password generation, password comparison and rule validation when registering a hash.
- **Internationalization (i18n) Management**: Managing your response messages in multiple languages ​​more effectively
- **Process Monitoring**: Real-time visualization of the processes executed by your API, number of requests executed, execution times and more...
- **Response Compression**: Compression of the responses sent by your API to the client to make faster transactions

## Documentation

For detailed usage and examples, check out the [documentation](https://apiutilsdoc.vercel.app/).

## Quick Start

Here's a quick example to get you started:

```javascript
const { generateCert } = require('apiutils.js');

const cert = generateCert();
```

## Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or improvements to the documentation, feel free to submit a pull request. Check out our [contributing guidelines](CONTRIBUTING.md) for more information.

## Security

If you discover any security vulnerabilities, please report them via [email](mailto:hello@daniel-valdez.com.com). We take security seriously and appreciate your help in keeping our library safe.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
