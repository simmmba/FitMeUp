import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Message.scss'

class Message extends Component {
  isImage = message =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  render () {
    const { message, user } = this.props
    return (
      <div className='room-message'>
        <Avatar className='avatar' alt='' src={user.profile_img} />
        <div className='message-content'>
          <span className='display-name'>{user.nickname}</span>
          {this.isImage(message) ? (
            <div className='image-wrapper'>
              <img
                className='message-img'
                src={message.image}
                alt={message.image}
              />
            </div>
          ) : (
            <p className='message-text'>{message.content}</p>
          )}
        </div>
      </div>
    )
  }
}

export default Message
