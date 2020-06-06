import React, { Component } from 'react'
import Modal from 'react-modal'
import firebase from '../../../firebaseConfig'
import axios from 'axios'
import { inject, observer } from 'mobx-react'

import UserInfoItem from '../Common/UserInfoItem'

@inject('chatting')
@observer
class UserInviteModal extends Component {
  state = {
    users: [],
    roomsRef: firebase.database().ref('rooms'),
    usersRef: firebase.database().ref('users')
  }

  componentDidMount () {
    this.getAllUsers()
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount () {
    this.removeListeners()
  }

  removeListeners = () => {
    this.state.roomsRef.off()
  }

  getAllUsers () {
    try {
      axios.get(`${process.env.REACT_APP_URL}/user/list`).then(res => {
        if (res.data.result == 'Success') {
          this.setState({ users: res.data.users })
        }else{
          console.log(res.data.detail)
        }
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  /**
   * 유저를 초대합니다.
   * room과 user는 many to many 관계이기 때문에
   * room id 밑에는 유저 정보를
   * user id 밑에는 방 정보를 저장합니다.
   */
  inviteUser = user => {
    const { roomsRef, usersRef } = this.state
    const { closeModal, currentRoom } = this.props
    if (currentRoom) {
      const key = currentRoom.id

      const invitedRoom = {
        id: currentRoom.id,
        name: currentRoom.name
      }

      const invitedUser = {
        id: user.id,
        nickname: user.nickname,
        profile_img: user.profile_img,
        type: user.type
      }

      roomsRef  
        .child(key)
        .child('users')
        .child(user.id)
        .set(invitedUser)
        .catch(err => {
          console.error(err)
        })

      usersRef
        .child(user.id)
        .child('rooms')
        .child(key)
        .set(invitedRoom)
        .catch(err => {
          console.error(err)
        })
      closeModal()
    }
  }

  /**
   * 현재 방에 들어와있는 유저를 제외하고 초대 가능한 유저만 보여줍니다.
   */
  displayUsers = users => {
    const currentRoomUserIds = this.props.currentRoomUsers.map(user => user.id)
    return (
      users.length > 0 &&
      users
        .filter(user => !currentRoomUserIds.includes(user.id))
        .map(user => (
          <UserInfoItem
            user={user}
            onClick={() => this.inviteUser(user)}
            key={user.id}
          />
        ))
    )
  }

  render () {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35rem',
        height: '80vh',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#fff',
        padding: '2rem',
        boxShadow:
          '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,.3)'
      }
    }

    const { isOpen, closeModal } = this.props
    const { users } = this.state
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1>초대하기</h1>
        <hr/>
        {this.displayUsers(users)}
      </Modal>
    )
  }
}

export default UserInviteModal
