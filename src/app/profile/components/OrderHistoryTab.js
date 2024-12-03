'use client';

export default function OrderHistoryTab() {
  const orders = [
    { id: '12345', date: '2024-11-01', total: '$150.00', items: 3 },
    { id: '67890', date: '2024-10-15', total: '$80.00', items: 1 },
  ];

  return (
    <div>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border-b pb-4">
              <p className="font-bold">Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p>Total: {order.total}</p>
              <p>Items: {order.items}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
}
