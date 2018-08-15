const joi = require('joi');
const { regex } = require('../utils');

const JOI = Symbol('Application#validator');
const REGEX = Symbol('Application#regex');

module.exports = {
  get validator() {
    if (!this[JOI]) {
      this[JOI] = joi;
    }
    return this[JOI];
  },
  get regex() {
    if (!this[REGEX]) {
      this[REGEX] = regex;
    }
    return this[REGEX];
  },
};
