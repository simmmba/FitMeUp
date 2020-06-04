import React, { Component } from 'react'
import firebase from '../../firebaseConfig'
import { inject, observer } from 'mobx-react'
import HashLoader from 'react-spinners/HashLoader'
import './RoomList.scss'

@inject('chatting')
@observer
class RoomList extends Component {
  state = {
    activeRoom: '',
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    rooms: null,
    loading: true,
    firstLoad: true
  }

  componentDidMount () {
    const { user } = this.state
    if (user) {
      this.addUserListener(user.id)
    }
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount () {
    this.removeListeners()
  }

  setFirstRoom = async () => {
    const firstRoom = this.state.rooms[0]
    this.props.chatting.setCurrentRoom(firstRoom)
    this.setState({ firstLoad: false })
  }

  changeRoom = room => {
    this.props.chatting.setCurrentRoom(room)
    this.setState({ room })
  }

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 userId의 방 객체가 추가 될때마다 실행 됩니다.
   * @param userId
   */
  addUserListener = userId => {
    const { usersRef } = this.state
    const loadedRooms = []
    usersRef
      .child(userId)
      .child('rooms')
      .on('child_added', snap => {
        loadedRooms.push(snap.val())
        this.setState({ rooms: loadedRooms, loading: false }, () => {
          if (this.state.firstLoad) {
            this.setFirstRoom()
          }
        })
      })
  }

  removeListeners = () => {
    this.state.usersRef.off()
  }

  displayRooms = rooms => {
    const { currentRoom } = this.props.chatting
    if (currentRoom) {
      return (
        rooms.length > 0 &&
        rooms.map(room => (
          <button
            type='button'
            onClick={() => this.changeRoom(room)}
            className={`room-name ${
              currentRoom.id === room.id ? 'active' : ''
            }`}
            key={room.id}
          >
            {`@ ${room.name}`}
          </button>
        ))
      )
    }
  }

  displaySpinner = user => (
    <div className='spinner-wrapper'>
      <HashLoader color='#ffffff' />
    </div>
  )

  render () {
    const { rooms, loading, user } = this.state
    return (
      <section className='room-list'>
        <h1 className='title'>OPEN CHAT</h1>
        {loading ? this.displaySpinner(user) : this.displayRooms(rooms)}
      </section>
    )
  }
}

export default RoomList
