/*import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../../../../../utils/firebase';
import { v4 as uuid } from 'uuid';

export default function UploadFile() {
  const fileupload = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const DriveRef = firebase.storage().ref('Drive').child(id);
    await DriveRef.put(file);
    const fileurl = await DriveRef.getDownloadURL();
  };

  return (
    <div>
      <Form className='mx-auto' }>
        <Form.Group>
          <Form.File
            className='mx-auto'
            name='file'
            onChange={(e) => fileupload(e)}
          />
        </Form.Group>
        <Button variant='dark' type='submit'>
          Upload
        </Button>
      </Form>
    </div>
  );
}
*/
