const ORDER_TYPES = {
  BUY: 'BUY',
  SELL: 'SELL',
};

const REGISTRATION_RESPONSE = {
  INVALID_DATA: 'Invalid registration details',
  REGISTER_ERROR: 'An error while adding order details',
};

const CANCEL_RESPONSE = {
  INVALID_DATA: 'Invalid Order Id',
  CANCEL_NOITEM: 'No such orderId to cancel',
};

module.exports = {
  ORDER_TYPES, REGISTRATION_RESPONSE, CANCEL_RESPONSE,
};
