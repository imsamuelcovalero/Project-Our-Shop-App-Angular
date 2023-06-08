/* testController.js em backend/src/tests/helpers */
const sinon = require('sinon');

const reqDefault = {
  body: {},
  query: {},
  params: {},
  headers: {},
  url: '/',
}

const testController = async (
  controller,
  request = reqDefault,
  err = null,
  locals = null,
  ) => {
  const result = {
    body: undefined,
    status: undefined,
  }

  const response = {
    json: (obj) => {
      result.body = obj
    },
    status: (num) => {
      result.status = num;
      return response
    },
    send: () => {},
    locals,
  }

  const nextArgs = {
    error: null,
  }

  const nextFunc = (err) => {
    nextArgs.error = err
  }

  const spyJson = sinon.spy(response, 'json');
  const spyStatus = sinon.spy(response, 'status');
  const spyNext = sinon.spy(nextFunc);

  try {
    if (err) {
      await controller(err, request, response, spyNext);
    } else {
      await controller(request, response, spyNext);
    }
  } catch (error) {
    nextFunc(error);
  }


  return {
    ...result,
    spies: { json: spyJson, status: spyStatus, next: spyNext },
    ...nextArgs,
  };
}

module.exports = testController;
