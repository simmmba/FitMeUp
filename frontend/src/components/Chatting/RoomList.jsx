import React, { Component } from "react";
import firebase from "../../firebaseConfig";
import { inject, observer } from "mobx-react";
import HashLoader from "react-spinners/HashLoader";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import "./RoomList.scss";

@inject("chatting")
@observer
class RoomList extends Component {
  state = {
    activeRoom: "",
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    rooms: null,
    loading: true,
    firstLoad: true,
  };

  componentDidMount() {
    const { user } = this.state;
    if (user) {
      this.addUserListener(user.id);
    }
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount() {
    this.removeListeners();
  }

  setFirstRoom = async () => {
    const firstRoom = this.state.rooms[0];
    this.props.chatting.setCurrentRoom(firstRoom);
    this.setState({ firstLoad: false });
  };

  changeRoom = (room) => {
    this.props.chatting.setCurrentRoom(room);
    this.setState({ room });
  };

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 userId의 방 객체가 추가 될때마다 실행 됩니다.
   * @param userId
   */
  addUserListener = async (userId) => {
    const { usersRef } = this.state;
    const loadedRooms = [];
    await usersRef
      .child(userId)
      .child("rooms")
      .once("value")
      .then((snapshot) => {
        usersRef
          .child(userId)
          .child("rooms")
          .on("child_added", (snap) => {
            loadedRooms.push(snap.val());
            this.setState({ rooms: loadedRooms, loading: false }, () => {
              if (this.state.firstLoad) {
                this.setFirstRoom();
              }
            });
          });
        if (!snapshot.exists()) this.setState({ rooms: [], loading: false });
      });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  displayRooms = (rooms) => {
    const { currentRoom } = this.props.chatting;
    const { currentUser } = this.props;
    if (currentRoom) {
      return (
        rooms.length > 0 &&
        rooms.map((room) => (
          <button
            type="button"
            onClick={() => this.changeRoom(room)}
            className="room-name"
            key={room.id}
          >
            <div
              className={`stylist-wrapper ${
                currentRoom.id === room.id ? "active" : ""
              }`}
            >
              <Avatar alt="" src={currentUser.profile_img} className="avatar" />
              <div className="user-info-content">
                <span className="display-name">{currentUser.nickname}</span>
                <span className="desc">
                  {currentUser.type === "general" ? "일반유저" : "스타일리스트"}
                </span>
              </div>
            </div>
          </button>
        ))
      );
    }
  };

  displaySpinner = (user) => (
    <div className="spinner-wrapper">
      <HashLoader color="#ffffff" />
    </div>
  );

  render() {
    const { rooms, loading, user } = this.state;
    return (
      <section className="room-list">
        <div className="search-box">
          <SearchIcon />
          <InputBase
            placeholder="Search…"
          />
        </div>
        <div className="list-wrapper">
          {loading ? this.displaySpinner(user) : this.displayRooms(rooms)}
        </div>
      </section>
    );
  }
}

export default RoomList;
