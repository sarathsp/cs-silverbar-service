const sinon = require('sinon');
const assert = require('assert');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

const { registerHandler } = require('./registerhandler');
const { REGISTRATION_RESPONSE } = require('../constants/appconstants');

const { expect } = chai;
chai.use(sinonChai);

describe('registerHandler', () => {
  it('register api should fail with invalid data for incorrect order type', async () => {
    const req = {
      body: {
        userId: '2112',
        orderQuantity: 3000,
        price: 400,
        orderType: 'SETTLE',
      },
    };
    const res = {};
    const next = sinon.fake();
    await registerHandler(req, res, next);
    assert(next.called);
    assert(next.calledWith(REGISTRATION_RESPONSE.INVALID_DATA));
  });
  it('register api should fail with invalid data for incorrect price', async () => {
    const req = {
      body: {
        userId: '2112',
        orderQuantity: 3000,
        price: '400',
        orderType: 'SETTLE',
      },
    };
    const res = {};
    const next = sinon.fake();
    await registerHandler(req, res, next);
    assert(next.called);
    assert(next.calledWith(REGISTRATION_RESPONSE.INVALID_DATA));
  });
  it('register api should fail with invalid data for incorrect price', async () => {
    const req = {
      body: {
        userId: '2112',
        orderQuantity: 3000,
        price: '400',
        orderType: 'BUY',
      },
    };
    const res = {};
    const next = sinon.fake();
    await registerHandler(req, res, next);
    assert(next.called);
    assert(next.calledWith(REGISTRATION_RESPONSE.INVALID_DATA));
  });
  it('register api should respond back orderId for valid data', async () => {
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
    await registerHandler(req, res, next);
    assert.notEqual(next.called);
    expect(res.send).to.be.calledWith({ orderId: 1001 });
  });
});
