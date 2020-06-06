import React from 'react'
import { inject, observer } from 'mobx-react'
import './Chatting.scss'

import Header from '../Common/Header'
import RoomList from './RoomList'
import SidePanel from './SidePanel'
import Room from './Room'

@inject('chatting')
@observer
class Chatting extends React.Component {
  user = JSON.parse(window.sessionStorage.getItem('user'))

  componentDidMount () {
    const { history } = this.props

    if (!this.user) {
      history.push('/login')
    }
  }

  render () {
    console.log('render Chatting.jsx')
    const { currentRoom } = this.props.chatting
    return (
      <div>
        <Header></Header>
        <div className='chatting'>
          <SidePanel currentUser={this.user} />
          <RoomList currentUser={this.user} />
          <Room currentUser={this.user} currentRoom={currentRoom} />
        </div>
      </div>
    )
  }
}

export default Chatting
