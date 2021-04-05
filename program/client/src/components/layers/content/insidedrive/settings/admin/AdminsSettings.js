import React from 'react';
import AdminSetting from './AdminSetting';
export default function AdminsSettings({ drivesubadmins }) {
  const admins = drivesubadmins.map((admin) => {
    return (
      <div key={admin._id} className='buddiessettings'>
        <AdminSetting admin={admin} />
      </div>
    );
  });
  return <div>{admins !== null ? admins : null}</div>;
}
