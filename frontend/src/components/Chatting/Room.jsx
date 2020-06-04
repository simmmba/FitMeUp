import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from '../../firebaseConfig'
import './Room.scss'

import RoomHeader from './RoomHeader/RoomHeader'
import MessageForm from './MessageForm'
import Paper from './Common/Paper'
import Message from './Message'

@inject('chatting')
@observer
class Room extends Component {
  constructor (props) {
    super(props)
    this.messageContentRef = React.createRef()
  }

  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    room: this.props.chatting.currentRoom,
    user: this.props.currentUser
  }

  componentDidMount () {
    const { room, user } = this.state
    console.log(room)
    // if (room && user) {
    //   this.addListeners(room.id)
    // }
  }

  componentWillUnmount () {
    this.removeListeners()
  }

  addListeners = roomId => {
    this.addMessageListener(roomId)
  }

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 roodId의 메세지 객체가 추가 될때마다 실행 됩니다.
   * @param roomId
   */
  addMessageListener = roomId => {
    const loadedMessages = []
    const ref = this.state.messagesRef
    
    ref.child(roomId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages
      })
    })
  }

  removeListeners = () => {
    this.state.messagesRef.off()
  }

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message key={message.timestamp} message={message} user={message.user} />
    ))

  scrollDown = () => {
    this.messageContentRef.current.scrollTop = this.messageContentRef.current.scrollHeight
  }

  render () {
    console.log("Render Room.jsx")
    const { currentRoom, currentUser } = this.props
    const { messages } = this.state
    return (
      <section className='room-messages'>
        <RoomHeader currentRoom={currentRoom} />
        {/* <Paper className='custom-paper'>
          <div className='message-content' ref={this.messageContentRef}>
            {this.displayMessages(messages)}
          </div>
        </Paper>
        <MessageForm
          scrollDown={this.scrollDown}
          currentUser={currentUser}
          currentRoom={currentRoom}
        /> */}
      </section>
    )
  }
}

export default Room
