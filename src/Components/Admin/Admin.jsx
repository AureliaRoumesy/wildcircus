import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, message, Divider } from 'antd';
import axios from 'axios';
import Login from '../../Components/Login/Login';
import EventForm from '../../Components/EventForm/EventForm';
import ArtistForm from '../../Components/ArtistForm/ArtistForm';
import setHeaderToken from '../../Utils/tokenUtil';
import conf from '../../app.conf';
import './Admin.css';

import { tokenApprovedTrueAction, tokenApprovedFalseAction } from '../../Actions/tokenAction';

function Admin({ tokenApproved, dispatch }) {
  useEffect(() => {
    setHeaderToken(() => {
      axios.post(`${conf.url}/api/auth`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(tokenApprovedTrueAction());
          } else {
            localStorage.removeItem('id_token');
          }
        })
        .catch(() => {
          message.error('Votre session a expiré, merci de vous authentifier à nouveau', 3);
        });
    });
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem('id_token');
    dispatch(tokenApprovedFalseAction());
  };

  return (
    <div>
      {tokenApproved ? (
        <div className='admin'>
          <Button type="primary" htmlType="submit" onClick={handleDisconnect}>
            Deconnection
          </Button>
          <h1>Espace administrateur</h1>
          <EventForm/>
          <Divider />
          <ArtistForm/>
        </div>
      )
        : (
          <div>
            <Login />
          </div>
        )}
    </div>
  );
}
const mapStateToProps = store => ({
  tokenApproved: store.token,
});


export default connect(mapStateToProps)(Admin);
