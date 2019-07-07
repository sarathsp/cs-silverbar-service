const R = require('ramda');

const { ORDER_TYPES } = require('../constants/appconstants');

const isValidRegister = R.where({
  userId: R.is(String),
  orderQuantity: R.is(Number),
  price: R.is(Number),
  orderType: R.either(R.equals(ORDER_TYPES.BUY), R.equals(ORDER_TYPES.SELL)),
});


const registerValidate = (registrationRequest) => {
  if (!isValidRegister(registrationRequest)) {
    return false;
  }
  return true;
};

module.exports = { registerValidate };
