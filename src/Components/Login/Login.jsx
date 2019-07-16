import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';

import { tokenApprovedTrueAction } from '../../Actions/tokenAction';
import conf from '../../app.conf';

import './Login.css';

function Login({ dispatch }) {
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [adminSignIn, setAdminSignIn] = useState({});

  useEffect(() => {
    const adminTemp = {
      emailSignIn,
      passwordSignIn,
    };
    setAdminSignIn(adminTemp);
  }, [emailSignIn, passwordSignIn]);

  const handleSendSignIn = (e) => {
    e.preventDefault();
    axios.post(`${conf.url}/api/login`, adminSignIn)
      .then((data) => {
        const token = data.data;
        localStorage.setItem('id_token', token);
        dispatch(tokenApprovedTrueAction());
        message.success("Bienvenue sur l'espace admin !", 3);
      })
      .catch(() => {
        message.error('Erreur dans le mail ou le mot de passe.', 3);
      });
  };

  return (
    <div className="login">
      <Form layout="inline" onSubmit={handleSendSignIn}>
        <Form.Item >
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              onChange={(e) => setEmailSignIn(e.target.value)}
            />
        </Form.Item>
        <Form.Item >
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              onChange={(e) => setPasswordSignIn(e.target.value)}
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={emailSignIn && passwordSignIn ? null : 'disabled'}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect()(Login);
