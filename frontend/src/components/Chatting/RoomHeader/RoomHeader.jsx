import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";
import firebase from "../../../firebaseConfig";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./RoomHeader.scss";

import Paper from "../Common/Paper";
import SimpleModal from "../Common/SimpleModal";

@inject("chatting")
@observer
class MessageHeader extends Component {
  state = {
    roomsRef: firebase.database().ref("rooms"),
    usersRef: firebase.database().ref("users"),
    currentRoomUsers: [],
    isConsumer: false,
    target: null,
    modal: false,
    modalType: "doComplete",
  };

  componentDidMount() {
    this.addListeners();
    this.checkUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentRoom !== prevProps.currentRoom) {
      this.addListeners();
      this.checkUser();
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

  checkUser = () => {
    const { currentRoom, currentUser } = this.props;
    if (currentRoom) {
      if (currentRoom.provider.id === currentUser.id) {
        this.setState({ target: currentRoom.consumer });
      } else {
        this.setState({ isConsumer: true, target: currentRoom.provider });
      }
    }
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  completeConsult = () => {
    const { currentRoom, currentUser } = this.props;
    const { usersRef } = this.state;
    try {
      axios
        .get(
          `${process.env.REACT_APP_URL}/consult/complete?consult_id=${currentRoom.consultId}`
        )
        .then((res) => {
          if (res.data.result === "Success") {
            usersRef
              .child(currentUser.id)
              .child("rooms")
              .child(currentRoom.id)
              .child("status")
              .set("완료")
              .then(() => {
                usersRef
                  .child(currentRoom.target.id)
                  .child("rooms")
                  .child(currentRoom.id)
                  .child("status")
                  .set("완료")
                  .then(() => {
                    usersRef
                      .child(currentUser.id)
                      .child("rooms")
                      .child(currentRoom.id)
                      .once("value", (snapshot) => {
                        console.log(snapshot.val());
                        this.props.chatting.setCurrentRoom(snapshot.val());
                        this.setState({ modalType: "completed" });
                      });
                  });
              });
          } else {
            //console.log(res.data.detail)
          }
        });
    } catch (e) {
      //console.log(e.message)
    }
  };

  completeEnd = () => {
    this.setState({ complete: false });
    this.closeModal();
  };

  exitRoom = () => {
    const { currentRoom, currentUser } = this.props;
    const { usersRef } = this.state;
    try {
      axios
        .get(
          `${process.env.REACT_APP_URL}/consult/complete?consult_id=${currentRoom.consultId}`
        )
        .then((res) => {
          if (res.data.result === "Success") {
            usersRef
              .child(currentUser.id)
              .child("rooms")
              .child(currentRoom.id)
              .remove()
              .then(() => {
                usersRef
                  .child(currentRoom.target.id)
                  .child("rooms")
                  .child(currentRoom.id)
                  .remove()
                  .then(()=>{
                    this.closeModal();
                    window.location.reload(false)
                  })
              });
          } else {
            console.log(res.data.detail);
          }
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { isConsumer, target, modal, modalType } = this.state;
    const { currentRoom, history } = this.props;
    return (
      <Fragment>
        <Paper className="message-header">
          {currentRoom && target ? (
            <>
              <div className="room-info">
                {isConsumer ? (
                  <button
                    className="name-btn"
                    type="button"
                    onClick={() =>
                      history.push("/portfolio/detail/" + target.id)
                    }
                  >
                    <h3 className="room-name">{target.nickname}</h3>
                    <ArrowForwardIosIcon className="icon" />
                  </button>
                ) : (
                  <h3 className="room-name cursor-default">
                    {target.nickname}
                  </h3>
                )}
              </div>
              <div className="link-to-consult">
                <button
                  type="button"
                  onClick={() =>
                    history.push("/consult/detail/" + currentRoom.consultId)
                  }
                >
                  <span className="text">상담 상세페이지</span>
                </button>
              </div>
              {isConsumer && currentRoom.status === "진행 중" && (
                <div className="complete-btn-wrapper">
                  <button
                    className="complete-btn"
                    onClick={() =>
                      this.setState({ modal: true, modalType: "doComplete" })
                    }
                  >
                    <span className="text">상담완료</span>
                  </button>
                </div>
              )}
              {currentRoom.status === "완료" && (
                <div className="complete-btn-wrapper">
                  <button
                    className="complete-btn"
                    onClick={() =>
                      this.setState({ modal: true, modalType: "doExit" })
                    }
                  >
                    <span className="text">채팅나가기</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="welcome-wrapper">
              <h3 className="text">FitMeUp 채팅</h3>
            </div>
          )}
        </Paper>
        <SimpleModal
          modal={modal}
          close={this.close}
          contents={
            <div className="modal-content">
              {modalType === "doComplete" && (
                <>
                  <span className="modal-text">상담을 완료하시겠습니까?</span>
                  <div className="btn-wrapper">
                    <button
                      className="confirm"
                      type="button"
                      onClick={this.completeConsult}
                    >
                      확인
                    </button>
                    <button
                      className="cancel"
                      type="button"
                      onClick={this.closeModal}
                    >
                      취소
                    </button>
                  </div>
                </>
              )}
              {modalType === "completed" && (
                <>
                  <span className="modal-text">상담을 완료했습니다</span>
                  <div className="btn-wrapper">
                    <button
                      className="confirm"
                      type="button"
                      onClick={this.completeEnd}
                    >
                      확인
                    </button>
                  </div>
                </>
              )}
              {modalType === "doExit" && (
                <>
                  <span className="modal-text">채팅방을 나가시겠습니까?</span>
                  <div className="btn-wrapper">
                    <button
                      className="confirm"
                      type="button"
                      onClick={this.exitRoom}
                    >
                      확인
                    </button>
                    <button
                      className="cancel"
                      type="button"
                      onClick={this.closeModal}
                    >
                      취소
                    </button>
                  </div>
                </>
              )}
            </div>
          }
        />
      </Fragment>
    );
  }
}

export default withRouter(MessageHeader);
