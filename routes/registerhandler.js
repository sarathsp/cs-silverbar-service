const { insertOrderDetails } = require('.././collection/operation');
const { registerValidate } = require('../validate/registervalidate');
const { REGISTRATION_RESPONSE } = require('../constants/appconstants');

async function registerHandler(req, res, next) {
  const {
    userId, orderQuantity, price, orderType,
  } = req.body;
  const registrationRequest = {
    userId, orderQuantity, price, orderType,
  };
  const isRegistrationValid = registerValidate(registrationRequest);
  if (!isRegistrationValid) return next(REGISTRATION_RESPONSE.INVALID_DATA);
  const orderId = insertOrderDetails(registrationRequest);
  if (!orderId) return next(REGISTRATION_RESPONSE.REGISTER_ERROR);
  return res.send({ orderId }); // Return orderId in case of success
}

module.exports = { registerHandler };
