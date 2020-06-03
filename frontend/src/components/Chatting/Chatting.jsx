import React from 'react'
import './Chatting.scss'

import Header from '../Common/Header'
import RoomList from './RoomList'
import SidePanel from './SidePanel'

class Chatting extends React.Component {
  user = JSON.parse(window.sessionStorage.getItem('user'))

  componentDidMount () {
    const { history } = this.props

    if (!this.user) {
      history.push('/login')
    }
  }

  render () {
    return (
      <>
        <Header></Header>
        <div className='chatting'>
          <SidePanel key={this.user && this.user.id} currentUser={this.user} />
          <RoomList currentUser={this.user} />
        </div>
      </>
    )
  }
}

export default Chatting
