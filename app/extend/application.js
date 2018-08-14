const API_ERROR = Symbol('Application#ApiError');

class _ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status || 500;
    this.code = code || 0;
  }
}

module.exports = {
  get ApiError() {
    if (!this[API_ERROR]) {
      this[API_ERROR] = _ApiError;
    }
    return this[API_ERROR];
  },
};
