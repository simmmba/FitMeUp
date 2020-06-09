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
    messagesRef: firebase.database().ref("messages"),
    storageRef: firebase.storage().ref(),
    messages: [],
    firstLoad: true,
    uploadTask: null,
    percentUploaded: 0,
    files: [],
  };

  async componentDidMount() {
    const { currentRoom, currentUser } = this.props;
    if (currentRoom && currentUser) {
      await this.loadMessages();
      this.addListeners(currentRoom.id);
    }
    this.scrollDown();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.currentRoom && prevProps.currentRoom !== this.props.currentRoom && this.props.currentUser) {
      await this.loadMessages();
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
    const loadedMessages = [];
    ref.child(roomId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      if (!this.state.firstLoad || this.state.messages.length <= loadedMessages.length) {
        this.setState({
          messages: loadedMessages,
          firstLoad: false,
        });
      }
    });
  };

  loadMessages = async () => {
    const { currentRoom } = this.props;
    const ref = this.state.messagesRef;

    let loadedMessages = [];
    await ref
      .child(currentRoom.id)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          loadedMessages.push(childSnapshot.val());
        });
      })
      .then(() => {
        this.setState({
          messages: loadedMessages,
        });
      });
  };

  removeListeners = () => {
    this.state.messagesRef.off();
  };

  displayMessages = (messages) => {
    let cur_day = -1;
    return (
      messages.length > 0 &&
      messages.map((message) => {
        const time = new Date(message.timestamp);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        let draw = false;
        if (cur_day !== day) {
          cur_day = day;
          draw = true;
        }
        return (
          <div key={message.timestamp}>
            {draw && <div className="date-wrapper">{year}년 {month}월 {day}일</div>}
            <Message
              message={message}
              user={message.user}
              currentUser={this.props.currentUser}
            />
          </div>
        );
      })
    );
  };

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
    const file = files.shift();
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
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
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
    // console.log(fileUrl);
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
        <RoomHeader currentRoom={currentRoom} currentUser={currentUser}/>
        <DragAndDrop dropbox={dropbox} handleDrop={this.handleDrop}>
          <div className="message-content" ref={this.messageContentRef}>
            {this.displayMessages(messages)}
          </div>
        </DragAndDrop>
        <ProgressBar completed={percentUploaded} />
        <MessageForm scrollDown={this.scrollDown} currentUser={currentUser} currentRoom={currentRoom} setPercent={this.setPercentage} />
      </section>
    );
  }
}

export default Room;
