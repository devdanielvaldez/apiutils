// certGenerator.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateCertificate() {
  const certDir = path.join(__dirname, 'cert-private');

  // Verificar si la carpeta cert-private existe
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir);
    console.log(`Created directory: ${certDir}`);
  }

  const certPath = path.join(certDir, 'cert.pem');

  if (fs.existsSync(certPath)) {
    console.log(`Certificate already exists at ${certPath}`);
    return;
  }

  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  fs.writeFileSync(certPath, privateKey);
  fs.writeFileSync(certPath + '.pub', publicKey);

  console.log(`Certificate generated successfully at ${certPath}`);
  return {
    msg: `Certificate generated successfully at ${certPath}`,
    ok: true
  };
}

module.exports = generateCertificate;