import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import firebase from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Tooltip from "@material-ui/core/Tooltip";
import mime from "mime-types";
import "./MessageForm.scss";

import FileUploadModal from "./FileUploadModal";

@inject("chatting")
@observer
class MessageForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    message: "",
    messagesRef: firebase.database().ref("messages"),
    usersRef: firebase.database().ref("users"),
    fileUploadModalIsOpen: false,
    files: [],
    loader: false,
  };

  openModal = () => {
    this.setState({ fileUploadModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ fileUploadModalIsOpen: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * message 객체를 반환합니다. message 객체는 file의 유무에 따라 사진 혹은 텍스트를 가지고 있습니다.
   * @return message obj
   * @param fileUrl
   */
  createMessage = (fileUrl = null) => {
    const { currentUser } = this.props;

    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.id,
        nickname: currentUser.nickname,
        profile_img: currentUser.profile_img,
        type: currentUser.type,
      },
    };
    if (fileUrl !== null) {
      message.image = fileUrl;
    } else {
      message.content = this.state.message;
    }
    return message;
  };

  /**
   * message 객체를 현재 방 id의 밑으로 저장합니다.
   * messages: {
   *  roomId : {
   *    messageId : {
   *      content: string,
   *      id: string,
   *      users: array
   *    }
   *  }
   * }
   */
  sendMessage = () => {
    const { scrollDown } = this.props;
    const { currentRoom, currentUser } = this.props;
    const { message, messagesRef, usersRef } = this.state;

    if (message && this.messageCheck(message)) {
      messagesRef
        .child(currentRoom.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          const currentRoomRef = usersRef
            .child(currentUser.id)
            .child("rooms")
            .child(currentRoom.id);
          currentRoomRef
            .child("lastMessage")
            .set(message)
            .then(() => {
              this.setState({ message: "" });
              scrollDown();
            });
          currentRoomRef
            .child("updated")
            .set(firebase.database.ServerValue.TIMESTAMP);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  messageCheck = (message) => {
    if (message.replace(/(\s*)/g, "") === "") return false;
    return true;
  };

  keyPress = (event) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  setFiles = async (files) => {
    await this.setState({ files });
    this.uploadFile();
  };

  /**
   * 구글 storage에 image를 업로드합니다.
   */
  uploadFile = () => {
    const { files } = this.state;
    const { currentRoom, setPercent } = this.props;
    const pathToUpload = currentRoom.id;
    const ref = this.state.messagesRef;
    const filePath = `images/${uuidv4()}.jpg`;

    if (files.length === 0) {
      this.setState({ loader: false });
      return;
    }
    this.setState({ loader: true });
    const file = files.shift();
    const metadata = { contentType: mime.lookup(file.name) };
    this.setState(
      (state) => ({
        uploadTask: state.storageRef.child(filePath).put(file, metadata),
      }),
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            setPercent(percentUploaded);
          },
          (err) => {
            console.error(err);
            this.setState({ uploadTask: null });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadUrl) => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch((err) => {
                console.error(err);
                this.setState({
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    const { setPercent } = this.props;
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(async () => {
        await setPercent(0);
        this.uploadFile();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { fileUploadModalIsOpen, loader } = this.state;
    const { currentRoom } = this.props;
    return (
      <div className="message-form">
        <div className="message-form-content">
          <button
            disabled={!currentRoom}
            type="button"
            className="upload-button"
            onClick={this.openModal}
          >
            <Tooltip title="사진 업로드">
              <PhotoLibraryIcon className="upload-icon" color="secondary" />
            </Tooltip>
          </button>
          <input
            disabled={!currentRoom || loader}
            placeholder={currentRoom ? "메세지를 적어주세요" : ""}
            onKeyPress={this.keyPress}
            onChange={this.handleChange}
            className="message-input"
            id="message"
            value={this.state.message}
            name="message"
            type="text"
            autoComplete="off"
          />
          <button className="send-btn" type="button" onClick={this.sendMessage}>
            <span className="send-btn-text">전송</span>
          </button>
        </div>
        <FileUploadModal
          isOpen={fileUploadModalIsOpen}
          closeModal={this.closeModal}
          setFiles={this.setFiles}
          loader={loader}
        />
      </div>
    );
  }
}

export default MessageForm;
