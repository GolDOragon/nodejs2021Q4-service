const fs = require('fs/promises');
const path = require('path');

class AppError extends Error {
  constructor({ message, name, code, logFile }) {
    super(message);

    this.name = name;
    this.code = code;
    this.logFile = logFile;
  }

  async logger() {
    fs.appendFile(
      path.resolve(__dirname, this.logFile),
      `[${new Date().toISOString()}] code: ${this.code}, message: ${
        this.message
      }\n`
    );
  }
}

module.exports = { AppError };
