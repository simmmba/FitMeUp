import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react'
import firebase from '../../../firebaseConfig';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import './RoomHeader.scss';

import Paper from '../Common/Paper';
import UserInviteModal from './UserInviteModal';
import CurrentRoomUsersModal from './CurrentRoomUsersModal';

@inject('chatting')
@observer
class MessageHeader extends Component {
  state = {
    UserListModalIsOpen: false,
    CurrentRoomUsersIsOpen: false,
    roomsRef: firebase.database().ref('rooms'),
    currentRoomUsers: [],
  };

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate(prevProps){
    if(this.props.currentRoom !== prevProps.currentRoom){
      this.addListeners();
    }
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    this.addRoomListener();
  };

  openCurrentRoomUsersModal = () => {
    this.setState({ CurrentRoomUsersIsOpen: true });
  };

  closeCurrentRoomUsersModal = () => {
    this.setState({ CurrentRoomUsersIsOpen: false });
  };

  openModal = () => {
    this.setState({ UserListModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ UserListModalIsOpen: false });
  };

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 roodId의 유저가 추가 될 때마다 실행 됩니다.
   */
  addRoomListener = () => {
    const { roomsRef } = this.state;
    const { currentRoom } = this.props;
    const currentRoomUsers = [];
    if (currentRoom) {
      roomsRef.child(currentRoom.id).child('users').on('child_added', (snap) => {
        currentRoomUsers.push(snap.val());
        this.setState({ currentRoomUsers });
      });
    }
  };

  removeListeners = () => {
    this.state.roomsRef.off();
  };

  render() {
    console.log("Render RoomHeader.jsx")
    const { currentRoom } = this.props;
    const { UserListModalIsOpen, currentRoomUsers, CurrentRoomUsersIsOpen } = this.state;
    return (
      <Fragment>
        <Paper className='message-header'>
          <div className='room-info'>
            <h3 className='room-name'>{`# ${currentRoom ? currentRoom.name : 'Welcome to Open Chat'}`}</h3>
            <button
              type="button"
              className='user-count'
              onClick={this.openCurrentRoomUsersModal}
              disabled={!currentRoom}
            >
              {`참여자 수 : ${currentRoomUsers.length}`}
            </button>
          </div>
          <button type="button" onClick={this.openModal} disabled={!currentRoom}>
            <Tooltip title="초대하기">
              <PersonAddIcon className='icon'/>
            </Tooltip>
          </button>
        </Paper>
        <UserInviteModal
          isOpen={UserListModalIsOpen}
          closeModal={this.closeModal}
          currentRoom={currentRoom}
          currentRoomUsers={currentRoomUsers}
        />
        <CurrentRoomUsersModal
          isOpen={CurrentRoomUsersIsOpen}
          closeModal={this.closeCurrentRoomUsersModal}
          currentRoomUsers={currentRoomUsers}
        />
      </Fragment>
    );
  }
}

export default MessageHeader;
