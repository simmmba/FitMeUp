import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Modal from "react-modal";
import "./Message.scss";

class Message extends Component {
  state = {
    imageModalOpen: false,
    selectedImage: null,
  };

  isImage = (message) =>
    message.hasOwnProperty("image") && !message.hasOwnProperty("content");

  openModal = (image) => {
    this.setState({ imageModalOpen: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ imageModalOpen: false });
  };

  render() {
    const { imageModalOpen, selectedImage } = this.state;
    const { message, user, currentUser } = this.props;
    const time = new Date(message.timestamp);
    const hour =
      time.getHours() - 12 >= 0
        ? "오후 " + ((time.getHours() * 1 - 12) === 0?time.getHours():(time.getHours()*1)-12)
        : "오전 " + time.getHours();
    const minute =
      (time.getMinutes() * 1) / 10 < 1
        ? "0" + time.getMinutes()
        : time.getMinutes();
    const customStyles = {
      content: {
        top: "52%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        maxHeight: "88vh",
        maxWidth: "80vw",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
        background: "#fff",
        padding: ".2rem",
        zIndex: 9999,
        boxShadow:
          "0px 1p 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,.3)",
      },
    };
    return (
      <div
        className={`room-message ${
          currentUser.id === user.id ? "my-message" : ""
        }`}
      >
        <Avatar className="avatar" alt="" src={user.profile_img} />
        <div className="message-content">
          <span
            className={`display-name ${
              currentUser.id === user.id ? "my-message" : ""
            }`}
          >
            {user.nickname}
          </span>
          {this.isImage(message) ? (
            <div
              className={`${
                currentUser.id === user.id ? "my-balloon" : "balloon"
              }`}
            >
              <div className="image-wrapper">
                <button
                  className="image-btn"
                  type="button"
                  onClick={() => this.openModal(message.image)}
                >
                  <img
                    className="message-img"
                    src={message.image}
                    alt="이미지를 찾을 수 없습니다"
                  />
                </button>
              </div>
              <div
                className={`${
                  currentUser.id === user.id ? "time-wrapper" : "time-wrapper2"
                }`}
              >
                <span>
                  {hour}:{minute}
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`${
                currentUser.id === user.id ? "my-balloon" : "balloon"
              }`}
            >
              <p
                className={`message-text ${
                  currentUser.id === user.id ? "my-message" : ""
                }`}
              >
                {message.content}
              </p>
              <div
                className={`${
                  currentUser.id === user.id ? "time-wrapper" : "time-wrapper2"
                }`}
              >
                <span>
                  {hour}:{minute}
                </span>
              </div>
            </div>
          )}
        </div>
        <Modal
          shouldCloseOnOverlayClick
          isOpen={imageModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <button class="image-btn" type="button" onClick={this.closeModal}>
            <img
              className="modal-img"
              src={selectedImage}
              alt={selectedImage}
            />
          </button>
        </Modal>
      </div>
    );
  }
}

export default Message;
