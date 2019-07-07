const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

const { summaryHandler } = require('./summaryhandler');
const { cancelHandler } = require('./cancelhandler');
const { registerHandler } = require('./registerhandler');


const { expect } = chai;
chai.use(sinonChai);

describe('summaryHandler', () => {
  before(() => {
    const request = {
      body: {
        orderId: '1001',
      },
    };
    const req = mockReq(request);
    const res = mockRes();
    const next = sinon.fake();
    cancelHandler(req, res, next);
  });
  it('summary api should return undefined buy/sell details for no data', async () => {
    const req = {};
    const res = mockRes();
    const next = sinon.fake();
    await summaryHandler(req, res, next);
    expect(res.send).to.be.calledWith({ data: { BUY: undefined, SELL: undefined } });
  });

  it('summary api should return aggregated buy and sell data sorted by descending buy and ascending sell', async () => {
    // Adding some data for tests
    const requestBodyArray = [
      {
        userId: '2112',
        orderQuantity: 3000,
        price: 400,
        orderType: 'BUY',
      },
      {
        userId: '2112',
        orderQuantity: 2000,
        price: 400,
        orderType: 'BUY',
      },
      {
        userId: '2114',
        orderQuantity: 3000,
        price: 200,
        orderType: 'BUY',
      },
      {
        userId: '2115',
        orderQuantity: 3000,
        price: 150,
        orderType: 'SELL',
      },
      {
        userId: '2116',
        orderQuantity: 2000,
        price: 100,
        orderType: 'SELL',
      },
      {
        userId: '2117',
        orderQuantity: 3000,
        price: 100,
        orderType: 'SELL',
      },
    ];
    const res = mockRes();
    const next = sinon.fake();
    requestBodyArray.forEach(async (requestBody) => {
      await registerHandler({ body: requestBody }, res, next);
    });

    const req = {};
    await summaryHandler(req, res, next);
    expect(res.send).to.be.calledWith({
      data: {
        BUY: [{
          orderIds: ['1002', '1003'],
          orderQuantity: 5000,
          orderType: 'BUY',
          price: 400,
          userIds: ['2112'],
        }, {
          orderIds: ['1004'],
          orderQuantity: 3000,
          orderType: 'BUY',
          price: 200,
          userIds: ['2114'],
        }],
        SELL: [{
          orderIds: ['1006', '1007'],
          orderQuantity: 5000,
          orderType: 'SELL',
          price: 100,
          userIds: ['2116', '2117'],
        }, {
          orderIds: ['1005'],
          orderQuantity: 3000,
          orderType: 'SELL',
          price: 150,
          userIds: ['2115'],
        }],
      },
    });
  });
});
