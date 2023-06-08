/* Desc: Custom error class to handle errors in the application */
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    // this.code = code;
  }
}

module.exports = CustomError;