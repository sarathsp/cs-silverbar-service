const R = require('ramda');
const logger = require('../lib/logger');
const { getOrderSummary } = require('.././collection/operation');


logger.addTarget('cs-silverbar-service -> summary');

const orderDetailsFormatted = R.map(orderSummaryDetails => R.merge({
  orderIds: [orderSummaryDetails.orderId],
  userIds: [orderSummaryDetails.userId],
}, R.omit(['orderId', 'userId'], orderSummaryDetails)));

const groupOrderDetails = R.pipe(
  R.values,
  R.groupBy(R.prop('orderType')),
);

const combineOrderDetails = (k, l, r) => R.cond([
  [R.equals('orderIds'), () => R.concat(l, r)],
  [R.equals('userIds'), () => R.union(l, r)],
  [R.equals('orderQuantity'), () => R.sum([l, r])],
  [R.T, R.always(l)],
])(k);

const mergeOrdersDetailWithSamePrice = R.pipe(
  R.groupBy(R.prop('price')),
  R.map(R.reduce(R.mergeWithKey(combineOrderDetails), [])),
  R.values,
);

const buyHighestPriceComparator = R.descend(R.prop('price'));
const sellLowestPriceComparator = R.ascend(R.prop('price'));

const transformOrderDetails = R.pipe(orderDetailsFormatted, groupOrderDetails, R.map(mergeOrdersDetailWithSamePrice), R.evolve(
  {
    BUY: R.sort(buyHighestPriceComparator),
    SELL: R.sort(sellLowestPriceComparator),
  },
));

async function summaryHandler(req, res, next) {
  logger.info('summaryHandler Invoked');
  const orderSummaryDetails = getOrderSummary();
  const { BUY, SELL } = transformOrderDetails(orderSummaryDetails);
  const summaryResponse = { data: { BUY, SELL } };

  if (!summaryResponse) return next('An error while adding order details');
  return res.send(summaryResponse); // Return orderSummary in case of success
}

module.exports = { summaryHandler };
