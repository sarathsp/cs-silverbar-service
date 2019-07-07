const R = require('ramda');

const { cancelOrderDetails } = require('../collection/operation');
const { CANCEL_RESPONSE } = require('../constants/appconstants');

async function cancelHandler(req, res, next) {
  const {
    orderId,
  } = req.body;

  if (!R.is(String, orderId)) return next(CANCEL_RESPONSE.INVALID_DATA);
  const cancelStatus = cancelOrderDetails(
    orderId,
  );

  if (!cancelStatus) return next(CANCEL_RESPONSE.CANCEL_NOITEM);
  return res.send({ status: cancelStatus }); // Return 200 in case of success with cancel status true
}

module.exports = { cancelHandler };
