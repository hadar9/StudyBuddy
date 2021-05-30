import React, { useState, useEffect } from 'react';
import {creategroup, adduser} from '../../../../../actions/chat'
import {getchatgroups} from '../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../../../../store/store'
import { Alert } from 'react-bootstrap';



function ChatGroups({creategroup, getchatgroups, adduser}) {
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState(null);
  const user_id = store.getState().auth.user._id;
  const username = store.getState().auth.user.username;
  const drive_id = store.getState().drives.drive._id;
  const drive = store.getState().drives.drive;
  const button_cb = async (e) => {
    e.preventDefault();
    creategroup(input, user_id, username);

    setInput('');
  };

  function enterchat(data)
  {
    data = data.split(',');
    var grps = store.getState().chat.groups;
    for(var g in grps)
    {
      if(grps[g][1] === data[1])
      {
          setAlert(<div class="alert alert-danger alert-dismissible">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>You're already in {data[1]}.</div>);
          return

      }
    }
    adduser(data[0], user_id, username);
    setAlert(<div class="alert alert-success alert-dismissible">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>You've joined {data[1]} chat!</div>);
  }

  useEffect(() => {
    getchatgroups(drive_id);
    const groups = store.getState().drives.chatgroups;
  }, []);


  
  

  return <div>
             {alert}
          <div className='createGroup'>
          <form onSubmit={(e) => button_cb(e)}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter group name'
              type='text'
            />  
            <button onClick={button_cb} type='submit'>Create group</button>
          </form>
          <div>
              {store.getState().drives.chatgroups ? store.getState().drives.chatgroups.map((data) => 
              
                  <div>
                    <div>Join Chat: </div>
                    
                    <button value={data} onClick={(e) => enterchat(e.target.value)}>
                        {data[1]}
                    </button>
                    
                <p></p>
                </div>
              
              ): null}
          </div>
 
          </div>
  </div>;
}

ChatGroups.propTypes = {
  creategroup: PropTypes.func.isRequired,
  getchatgroups: PropTypes.func.isRequired,
  adduser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});
export default connect(mapStateToProps, {
  creategroup,getchatgroups,adduser,
})(ChatGroups);
