import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import firebase from "../../../firebaseConfig";
import "./RoomHeader.scss";

import Paper from "../Common/Paper";

@inject("chatting")
@observer
class MessageHeader extends Component {
  state = {
    UserListModalIsOpen: false,
    CurrentRoomUsersIsOpen: false,
    roomsRef: firebase.database().ref("rooms"),
    currentRoomUsers: [],
  };

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentRoom !== prevProps.currentRoom) {
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
      roomsRef
        .child(currentRoom.id)
        .child("users")
        .on("child_added", (snap) => {
          currentRoomUsers.push(snap.val());
          this.setState({ currentRoomUsers });
        });
    }
  };

  removeListeners = () => {
    this.state.roomsRef.off();
  };

  render() {
    const { currentRoom } = this.props;
    return (
      <Fragment>
        <Paper className="message-header">
          <div className="room-info">
            <h3 className="room-name">{`${currentRoom ? currentRoom.name : "Welcome to FitMeUp Chat"}`}</h3>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

export default MessageHeader;
