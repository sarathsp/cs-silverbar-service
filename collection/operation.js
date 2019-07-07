// In memory db - maintained in orders JSON array
const R = require('ramda');

let nextId = 1000;
const orderDetails = {};

const insertOrderDetails = (orderDetail) => {
  orderDetails[nextId] = R.merge({ orderId: String(nextId) }, orderDetail);
  nextId += 1;
  return nextId - 1;
};

const cancelOrderDetails = orderId => (orderDetails[orderId] ? delete orderDetails[orderId] : false);

const getOrderSummary = () => orderDetails;

module.exports = { insertOrderDetails, cancelOrderDetails, getOrderSummary };
