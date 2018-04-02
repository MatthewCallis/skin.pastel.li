export default class AVUnderflowError extends Error {
  constructor(message) {
    super(message);

    this.name = 'AVUnderflowError';
    this.stack = (new Error(message)).stack;
    /* istanbul ignore else */
    // https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
