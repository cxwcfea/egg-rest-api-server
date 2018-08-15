module.exports = {
  validate(schema, payload) {
    const data = payload || this.request.body;
    const { error, value } = this.app.validator.validate(data, schema);
    if (error) {
      this.throw(422, 'parameters check fail', { details: error.details });
    }
    this.state.reqParams = value;
  },
};
