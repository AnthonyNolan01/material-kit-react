/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';

function ProfileSettings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords don't match.");
      // Clear the password fields
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
      return;
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });
      const data = await response.json();
      // Use the response message if available, otherwise set a default success message
      setMessage(data.message || 'Password updated successfully.');
      // Clear the password fields
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage('Error changing password.');
      // Clear the password fields
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfileSettings;
