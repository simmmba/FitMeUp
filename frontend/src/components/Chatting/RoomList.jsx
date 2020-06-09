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
    rooms: [],
    loading: true,
    firstLoad: true,
  };

  async componentDidMount() {
    const { user } = this.state;
    if (user) {
      await this.loadRooms(user);
      this.addListener(user.id);
    }
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount() {
    this.removeListeners();
  }

  setFirstRoom = () => {
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
  addListener = (userId) => {
    const { usersRef } = this.state;
    const loadedRooms = [];
    usersRef
      .child(userId)
      .child("rooms")
      .once("value")
      .then((snapshot) => {
        const rooms_snapshot = usersRef.child(userId).child("rooms");
        rooms_snapshot.on("child_added", (snap) => {
          loadedRooms.unshift(snap.val());
          if (
            !this.state.firstLoad ||
            this.state.rooms.length <= loadedRooms.length
          ) {
            this.setState({ rooms: loadedRooms, loading: false }, () => {
              if (this.state.firstLoad) {
                this.setState({ firstLoad: false });
                this.setFirstRoom();
              }
            });
          }
        });

        rooms_snapshot.on("child_changed", () => {
          this.loadRooms(this.state.user);
        });
        if (!snapshot.exists()) this.setState({ rooms: [], loading: false });
      });
  };

  loadRooms = async (user) => {
    const { usersRef } = this.state;
    const loadedRooms = [];
    await usersRef
      .child(user.id)
      .child("rooms")
      .once("value", (snapshot) => {
        snapshot.forEach((snap) => {
          loadedRooms.push(snap.val());
        });
      })
      .then(() => {
        this.setState({ rooms: loadedRooms, loading: false });
      });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  displayRooms = () => {
    const { rooms } = this.state;
    const { currentRoom } = this.props.chatting;
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
              <Avatar
                alt=""
                src={room.provider.profile_img}
                className="avatar"
              />
              <div className="user-info-content">
                <div className="name-wrapper">
                  <span className="display-name">{room.provider.nickname}</span>
                  <span className="status" >{room.status}</span>
                </div>
                <span className="desc">{room.lastMessage}</span>
              </div>
            </div>
          </button>
        ))
      );
    }
  };

  displaySpinner = (user) => (
    <div className="spinner-wrapper">
      <HashLoader color="#000" />
    </div>
  );

  render() {
    const { loading, user } = this.state;
    return (
      <section className="room-list">
        <div className="search-box">
          <SearchIcon />
          <InputBase placeholder="Search…" />
        </div>
        <div className="list-wrapper">
          {loading ? this.displaySpinner(user) : this.displayRooms()}
        </div>
      </section>
    );
  }
}

export default RoomList;
