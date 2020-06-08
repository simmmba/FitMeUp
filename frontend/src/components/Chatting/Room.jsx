import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import firebase from "../../firebaseConfig";
import "./Room.scss";

import RoomHeader from "./RoomHeader/RoomHeader";
import MessageForm from "./MessageForm";
import DragAndDrop from "./Common/DragAndDrop";
import Message from "./Message";
import ProgressBar from "./ProgressBar";

@inject("chatting")
@observer
class Room extends Component {
  constructor(props) {
    super(props);
    this.messageContentRef = React.createRef();
  }

  state = {
    messages: [],
    messagesRef: firebase.database().ref("messages"),
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    percentUploaded: 0,
    files: [],
  };

  componentDidMount() {
    const { currentRoom, currentUser } = this.props;
    if (currentRoom && currentUser) {
      this.addListeners(currentRoom.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentRoom &&
      prevProps.currentRoom !== this.props.currentRoom &&
      this.props.currentUser
    ) {
      this.addListeners(this.props.currentRoom.id);
    }
    this.scrollDown();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = (roomId) => {
    this.addMessageListener(roomId);
  };

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 roodId의 메세지 객체가 추가 될때마다 실행 됩니다.
   * @param roomId
   */
  addMessageListener = async (roomId) => {
    const ref = this.state.messagesRef;
    await ref
      .child(roomId)
      .once("value")
      .then((snapshot) => {
        ref.child(roomId).on("child_changed", (snap) => {
          this.loadMessages();
        });
        this.loadMessages();
        if (!snapshot.exists()) {
          this.setState({
            messages: [],
          });
        }
      });
  };

  loadMessages = () => {
    const { currentRoom } = this.props;
    const ref = this.state.messagesRef;
    let loadedMessages = [];

    ref.child(currentRoom.id).once("value", async (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        loadedMessages.push(childSnapshot.val());
      });

      this.setState({ messages: loadedMessages });
    });
  };

  removeListeners = () => {
    this.state.messagesRef.off();
  };

  displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message
        key={message.timestamp}
        message={message}
        user={message.user}
        currentUser={this.props.currentUser}
      />
    ));

  scrollDown = () => {
    this.messageContentRef.current.scrollTop = this.messageContentRef.current.scrollHeight;
  };

  handleDrop = async (files) => {
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i]);
    }

    await this.setState({ files: [...this.state.files, ...fileList] });
    this.sendFile();
  };

  sendFile = () => {
    const { files } = this.state;
    if (files.length === 0) return;
    const file = files.pop(0);
    if (file !== null) {
      const metadata = { contentType: mime.lookup(file.name) };
      this.uploadFile(file, metadata);
    }
  };

  uploadFile = (file, metadata) => {
    const { currentRoom } = this.props;
    const pathToUpload = currentRoom.id;
    const ref = this.state.messagesRef;
    const filePath = `images/${uuidv4()}.jpg`;

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
            this.setPercentage(percentUploaded);
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
    console.log(fileUrl);
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(async () => {
        await this.setState({ percentUploaded: 0 });
        this.sendFile();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  setPercentage = (percent) => {
    this.setState({ percentUploaded: percent });
  };

  render() {
    const { currentRoom, currentUser } = this.props;
    const { messages, percentUploaded } = this.state;
    const dropbox = {
      position: "relative",
      width: "100%",
      height: "calc(100% - 71.6px - 75px)",
    };
    return (
      <section className="room-messages">
        <RoomHeader currentRoom={currentRoom} />
        <DragAndDrop dropbox={dropbox} handleDrop={this.handleDrop}>
          <div className="message-content" ref={this.messageContentRef}>
            {this.displayMessages(messages)}
          </div>
        </DragAndDrop>
        <ProgressBar completed={percentUploaded} />
        <MessageForm
          scrollDown={this.scrollDown}
          currentUser={currentUser}
          currentRoom={currentRoom}
          setPercent={this.setPercentage}
        />
      </section>
    );
  }
}

export default Room;
