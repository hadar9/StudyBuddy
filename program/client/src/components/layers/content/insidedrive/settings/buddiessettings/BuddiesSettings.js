import React from 'react';
import BuddySetting from './BuddySetting';
export default function BuddiesSettings({ drivebuddies }) {
  const buddies = drivebuddies.map((buddy) => {
    if (buddy.status === 'drivebuddy') {
      return (
        <div key={buddy._id} className='buddiessettings'>
          <BuddySetting buddy={buddy} />
        </div>
      );
    }
  });
  return <div>{buddies !== null ? buddies : null}</div>;
}
