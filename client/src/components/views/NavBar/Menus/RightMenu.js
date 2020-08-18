/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { logoutUser } from "../../../../_actions/user_actions";

import { Menu } from 'antd';

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    })
  };

  if (!user.userData || !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);