const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

const { cancelHandler } = require('./cancelhandler');
const { CANCEL_RESPONSE } = require('../constants/appconstants');
const { registerHandler } = require('./registerhandler');

const { expect } = chai;
chai.use(sinonChai);

describe('cancelHandler', () => {
  before(() => {
    const request = {
      body: {
        userId: '2112',
        orderQuantity: 3000,
        price: 400,
        orderType: 'BUY',
      },
    };
    const req = mockReq(request);
    const res = mockRes();
    const next = sinon.fake();
    registerHandler(req, res, next);
  });
  it('cancel api should fail with invalid data for incorrect order type', async () => {
    const req = {
      body: {
        orderId: [2112],
      },
    };
    const res = {};
    const next = sinon.fake();
    await cancelHandler(req, res, next);
    assert(next.called);
    assert(next.calledWith(CANCEL_RESPONSE.INVALID_DATA));
  });
  it('cancel api should fail if no orderId present', async () => {
    const req = {
      body: {
        orderId: '5000000',
      },
    };
    const res = {};
    const next = sinon.fake();
    await cancelHandler(req, res, next);
    assert(next.called);
    assert(next.calledWith(CANCEL_RESPONSE.CANCEL_NOITEM));
  });

  it('cancel api should respond back with status true if orderId cancelled', async () => {
    const request = {
      body: {
        orderId: '1000',
      },
    };
    const req = mockReq(request);
    const res = mockRes();
    // const res = { send: (data) => { console.log(data); } };
    const next = sinon.fake();
    await cancelHandler(req, res, next);
    assert.notEqual(next.called);
    expect(res.send).to.be.calledWith({ status: true });
  });
});
