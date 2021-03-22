import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

export default function Settings() {
  return (
    <div className='settings'>
      <h1 className='settings-title'>Settings</h1>
      <BootstrapSwitchButton
        checked={true}
        onstyle='info'
        offstyle='dark'
        onlabel='public'
        offlabel='private'
        size='lg'
        width='100'
      />
    </div>
  );
}
