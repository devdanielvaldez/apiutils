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

In this example, we'll explore the basic usage of the ApiUtils library by creating a simple API server that handles user authentication and message encryption. We'll demonstrate how to generate tokens, encrypt passwords, and manage internationalized response messages.

Let's dive into the code and see how to set up the server and utilize the various functionalities provided by the ApiUtils library.

### Encrypt Password

The following code shows the process of rapid password encryption along with rule validation

```javascript
// app.js
const { encrypt } = require('apiutils.js');

const hashPassword = encrypt('Test01*', {uppercase: true, lowercase: true, 
specialCharacters: true, numbers: true, containsPersonalInfo: false});

console.log('password hashing -->', hashPassword); // password hashing --> asd8f7qn09sadu98asdhqn93u
```

The following code shows the process of fast password encryption along with rule validation and validation of personal data within the rules

```javascript
// app.js
const { encrypt } = require('apiutils.js');

const hashPassword = encrypt('Test01*', {uppercase: true, lowercase: true, 
specialCharacters: true, numbers: true, containsPersonalInfo: true, 
personalInfo: { name: "John", last_name: "Smith", born_date: "01/01/2000" }});

console.log('password hashing -->', hashPassword); // password hashing --> asd8f7qn09sadu98asdhqn93u
```

### Decrypt Password

The following code shows the process of comparing the password supplied by the user with a quick validation of the password in plain text against the hash

```javascript
// app.js
const { decrypt } = require('apiutils.js');

const comparePassword = decrypt('Test01*', 'asd8f7qn09sadu98asdhqn93u');
console.log('password compare -->', comparePassword); // password compare --> true
```

### Generate Token

The following code shows the generation process for an authentication token, which allows loading an internal payload and expiration time

```javascript
// app.js
const { generateToken } = require('apiutils.js');

const payload = {
    fullName: "John Smith",
    userId: "00202031"
};
const expireIn = "4H";
const token = generateToken(payload, expireIn);

console.log('token -->', token); // token --> eyawdfasdf97a8sdf90qa9f87d9f8a7sdf...
```

### VerifyToken

The following code shows the validation process of an authentication token, which allows validating if it has expired or if it has been signed with the certificate generated by the system

```javascript
// app.js
const { verifyToken } = require('apiutils.js');

const token = "eyawdfasdf97a8sdf90qa9f87d9f8a7sdf...";
const isValidToken = verifyToken(token);

console.log('token -->', isValidToken); // token --> { isValid: true }
```

### MiddlewareToken Auth

The following code shows how to validate an authentication token in a Node.js application using middleware. This middleware checks if the provided token is valid, that is, if it is not expired and if it has been signed with the correct certificate generated by the system.

```javascript
// app.js
const express = require('express');
const { middlewareToken } = require('apiutils.js');

const app = express();

app.use('/users', middlewareToken);

// Route with middleware
app.get('/users', (req, res) => {
  res.send('Obteniendo lista de usuarios');
});

// Route without middleware
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(3000, () => {
  console.log('Server running in port 3000');
});
```

### i18n for api response

The following code shows how to handle response messages from your API in multiple languages ​​in a totally easy way in your code

```json
// en.json
{
    "NOT_FOUND": "Not found",
    "SUCCESS_LOGIN": "Success Login"
}
```

```json
// es.json
{
    "NOT_FOUND": "No hemos podido encontrarlo",
    "SUCCESS_LOGIN": "Inicio de Sesión satisfactorio"
}
```

```javascript
// app.js
const express = require('express');
const { i18n_msg_manage } = require('apiutils.js');

const app = express();

app.use((req, res, next) => {
  req.headers.lng = req.headers['accept-language'] || 'en';
  next();
});

app.get('/users', (req, res) => {
  res.status(404).json({
    msg: i18n_msg_manage(req.headers.lng, 'NOT_FOUND')
  });
});

app.listen(3000, () => {
  console.log('Server running in port 3000');
});
```

### Proccess Monitoring

The following code shows how to implement monitoring of your API processes.

```javascript
// app.js
const express = require('express');
const { processMonitoring } = require('apiutils.js');

const app = express();

app.use(processMonitoring);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

```bash
[2024-04-12T10:30:15.123Z] Process started: GET /api/users
[2024-04-12T10:30:15.124Z] Total requests: 1
[2024-04-12T10:30:20.125Z] CPU usage: 12000μs user, 5000μs system
[2024-04-12T10:30:20.125Z] Memory usage: 200 MB used, 800 MB free
[2024-04-12T10:30:20.126Z] Process finished: GET /api/users
[2024-04-12T10:30:20.126Z] Elapsed time: 3.432ms
[2024-04-12T10:30:20.126Z] Total requests: 1
```

### Compress Response

The following code shows the process of implementing API response compression for faster transactions from server to client.

```javascript
// app.js
const express = require('express');
const {compressResponse} = require('apiutils.js');

const app = express();

app.use(compressResponse);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or improvements to the documentation, feel free to submit a pull request. Check out our [contributing guidelines](CONTRIBUTING.md) for more information.

## Security

If you discover any security vulnerabilities, please report them via [email](mailto:hello@daniel-valdez.com.com). We take security seriously and appreciate your help in keeping our library safe.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
