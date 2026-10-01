// Pending orders live only in memory: created when a candidate starts
// checkout, consumed (and deleted) the moment payment is verified.
// This is fine for a single-server dev/small-scale setup. For production
// at scale, swap this for a real database table with an expiry.

const pendingOrders = new Map();

function savePendingOrder(orderId, data) {
  pendingOrders.set(orderId, { ...data, createdAt: Date.now() });
}

function getPendingOrder(orderId) {
  return pendingOrders.get(orderId);
}

function deletePendingOrder(orderId) {
  pendingOrders.delete(orderId);
}

module.exports = { savePendingOrder, getPendingOrder, deletePendingOrder };
