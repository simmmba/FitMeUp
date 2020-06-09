import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";
import firebase from "../../../firebaseConfig";
import Modal from "react-modal";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./RoomHeader.scss";

import Paper from "../Common/Paper";

@inject("chatting")
@observer
class MessageHeader extends Component {
  state = {
    completeModal: false,
    roomsRef: firebase.database().ref("rooms"),
    usersRef: firebase.database().ref("users"),
    currentRoomUsers: [],
    isConsumer: false,
    target: null,
    complete: false,
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

  openModal = () => {
    this.setState({ completeModal: true });
  };

  closeModal = () => {
    this.setState({ completeModal: false });
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
                this.setState({ complete: true });
              });
          } else {
            console.log(res.data.detail);
          }
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  completeEnd = () => {
    this.setState({ complete: false });
  };

  render() {
    const { isConsumer, target, completeModal, complete } = this.state;
    const { currentRoom, history } = this.props;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -45%)",
        border: "none",
        background: "#fff",
        padding: "1.5rem",
        width: "30vw",
        justifyContent: "center",
        boxShadow:
          "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,.3)",
      },
    };
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
              {isConsumer && (
                <div className="complete-btn-wrapper">
                  <button className="complete-btn" onClick={this.openModal}>
                    <span className="text">상담완료</span>
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
        <Modal
          shouldCloseOnOverlayClick
          isOpen={completeModal}
          onRequestClose={this.close}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="modal-content">
            {complete ? (
              <>
                <span className="modal-text">상담을 완료하시겠습니까?</span>
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
            ) : (
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
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default withRouter(MessageHeader);
