import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './UserInfoItem.scss'

class UserInfoItem extends Component {
  render () {
    const { user, onClick } = this.props
    return (
      <button className='user-info-item' onClick={onClick} type='button'>
        <Avatar alt='' src={user.avatar} className='avatar' />
        <div className='user-info-content'>
          <span className='display-name'>{user.name}</span>
          <span className='type'>
            {user.type == 'general' ? '일반유저' : '스타일리스트'}
          </span>
        </div>
      </button>
    )
  }
}

export default UserInfoItem
