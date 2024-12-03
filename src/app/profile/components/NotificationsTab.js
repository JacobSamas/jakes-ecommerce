'use client';

export default function NotificationsTab() {
  const notifications = [
    'Your order #12345 has been shipped.',
    'Your profile was updated successfully.',
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
}
