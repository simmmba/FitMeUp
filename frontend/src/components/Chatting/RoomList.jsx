import React, { Component } from "react";
import axios from "axios";
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
      await this.addListener(user.id);
      this.loadRooms(user);
    }
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount() {
    this.removeListeners();
  }

  setFirstRoom = () => {
    if (this.state.rooms.length > 0) {
      const firstRoom = this.state.rooms[0];
      console.log(firstRoom);
      this.props.chatting.setCurrentRoom(firstRoom);
    }
    this.setState({ firstLoad: false });
  };

  changeRoom = (room) => {
    this.props.chatting.setCurrentRoom(room);
    this.setState({ room });
  };

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 userId의 방 객체가 추가, 변경 될때마다 실행 됩니다.
   * @param userId
   */
  addListener = async (userId) => {
    const { usersRef } = this.state;
    await usersRef
      .child(userId)
      .child("rooms")
      .once("value")
      .then(async (snapshot) => {
        const rooms_snapshot = usersRef.child(userId).child("rooms");
        await rooms_snapshot.on("child_added", (snap) => {
          if (!this.state.firstLoad) {
            this.setState({ rooms: [...this.state.rooms, snap.val()] });
          }
        });

        await rooms_snapshot.on("child_changed", () => {
          this.loadRooms(this.state.user);
        });
        if (!snapshot.exists()) this.setState({ rooms: [], loading: false });
      });
  };

  // 유저의 방들을 로드 합니다.
  loadRooms = (user) => {
    const { usersRef } = this.state;
    let loadedRooms = [];
    usersRef
      .child(user.id)
      .child("rooms")
      .once("value", (snapshot) => {
        const size = snapshot.numChildren();
        let processed = 0;
        snapshot.forEach((snap) => {
          let room = snap.val();
          axios
            .get(
              `${process.env.REACT_APP_URL}/user/myinfo?user_id=` +
                room.target.id
            )
            .then((res) => {
              room.target = res.data.user;
              loadedRooms.push(room);
              processed++;
              if (processed === size) {
                loadedRooms.sort((a, b) => {
                  return b.updated * 1 - a.updated * 1;
                });
                this.setState(
                  { rooms: loadedRooms, loading: false },
                  () => {
                    if (this.state.firstLoad) {
                      this.setFirstRoom();
                      this.setState({ firstLoad: false });
                    }
                  }
                );
              }
            });
        });
      });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  // 방들을 디스플레이합니다
  displayRooms = (rooms) => {
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
                src={`${
                  room.target.profile_img ? room.target.profile_img : ""
                }`}
                className="avatar"
              />
              <div className="user-info-content">
                <div className="name-wrapper">
                  <span className="display-name">{room.target.nickname}</span>
                  <span className="status">{room.status}</span>
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
    const { loading, user, rooms } = this.state;
    return (
      <section className="room-list">
        <div className="search-box">
          <SearchIcon />
          <InputBase placeholder="Search…" />
        </div>
        <div className="list-wrapper">
          {loading ? this.displaySpinner(user) : this.displayRooms(rooms)}
        </div>
      </section>
    );
  }
}

export default RoomList;
