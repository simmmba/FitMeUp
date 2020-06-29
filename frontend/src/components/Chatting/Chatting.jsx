import React from "react";
import { inject, observer } from "mobx-react";
import firebase from "../../firebaseConfig";
import "./Chatting.scss";

import Header from "../Common/Header";
import RoomList from "./RoomList";
import SidePanel from "./SidePanel";
import Room from "./Room";

@inject("chatting")
@observer
class Chatting extends React.Component {
  state = {
    usersRef: firebase.database().ref("users"),
    isEmpty: true,
  };
  user = JSON.parse(window.sessionStorage.getItem("user"));

  componentDidMount() {
    const { usersRef } = this.state;
    const { history } = this.props;

    if (!this.user) {
<<<<<<< HEAD
      alert("로그인을 해야 이용 가능한 서비스 입니다.");
      history.goBack();
    } else {
      usersRef
        .child(this.user.id)
        .child("rooms")
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) this.setState({ isEmpty: false });
        });
    }
  }

  displayEmpty = () => (
    <div className="empty-box">
      <div className="text-box">
        <h2 className="logo">Fit Me Up</h2>
        <span className="empty-text">진행중인 상담이 없습니다</span>
      </div>
    </div>
  );

  render() {
    const { isEmpty } = this.state;
    const { currentRoom } = this.props.chatting;
    return (
      <div>
        <Header />
        <div className="chatting">
          <SidePanel currentUser={this.user} currentRoom={currentRoom} />
          <RoomList currentUser={this.user} />
          {isEmpty ? (
            this.displayEmpty()
          ) : (
            <Room currentUser={this.user} currentRoom={currentRoom} />
          )}
        </div>
      </div>
    );
  }
}

export default Chatting;
