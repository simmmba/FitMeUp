import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Message.scss'

class Message extends Component {
  isImage = message =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  

  render () {
    const { message, user, currentUser } = this.props
    return (
      <div className={`room-message ${currentUser.id == user.id ? 'my-message':''}`}>
        <Avatar className='avatar' alt='' src={user.profile_img} />
        <div className='message-content'>
          <span className={`display-name ${currentUser.id == user.id ? 'my-message':''}`}>{user.nickname}</span>
          {this.isImage(message) ? (
            <div className='image-wrapper'>
              <img
                className='message-img'
                src={message.image}
                alt={message.image}
              />
            </div>
          ) : (
            <div className={`${currentUser.id == user.id ? 'my-balloon':'balloon'}`}>
            <p className={`message-text ${currentUser.id == user.id ? 'my-message':''}`}>{message.content}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Message
