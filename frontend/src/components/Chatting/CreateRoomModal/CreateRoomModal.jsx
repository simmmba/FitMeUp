import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from '../../../firebaseConfig'
import Modal from 'react-modal'
import './CreateRoomModal.scss'

import Input from '../Common/Input'
import Button from '../Common/Button'

@inject('chatting')
@observer
class CreateRoomModal extends Component {
  state = {
    roomName: '',
    user: this.props.currentUser,
    roomsRef: firebase.database().ref('rooms'),
    usersRef: firebase.database().ref('users'),
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createRoom = () => {
    const { roomsRef, usersRef, roomName, user } = this.state
    const { closeModal } = this.props
    const { key } = roomsRef.push()
    
    const newRoom = {
      id: key,
      name: roomName
    }

    const createUser = {
      id: user.id,
      name: user.nickname,
      avatar: user.profile_img,
      type: user.type
    }

    roomsRef
      .child(key)
      .update(newRoom)
      .then(() => {
        this.setState({ roomName: '' })
        roomsRef
          .child(key)
          .child('users')
          .child(user.id)
          .set(createUser)
          .catch(err => {
            console.error(err)
          })

        usersRef
          .child(user.id)
          .child('rooms')
          .child(key)
          .set(newRoom)
          .catch(err => {
            console.error(err)
          })

        this.props.chatting.setCurrentRoom(newRoom)
        closeModal()
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleSubmit = () => {
    if (this.isFormValid(this.state)) {
      this.createRoom()
    }
  }

  isFormValid = ({ roomName }) => roomName

  componentDidMount () {
    Modal.setAppElement('body')
  }

  render () {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35rem',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: 15,
        background: '#fff',
        boxShadow:
          '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,.3)'
      }
    }

    const { isOpen, closeModal } = this.props
    const { roomName } = this.state
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h1 className='createroom-title'>방 만들기</h1>
        <hr />
        <Input
          id='roomName'
          name='roomName'
          value={roomName}
          placeholder='제목'
          type='text'
          onChange={this.handleChange}
          ariaHideApp={false}
        />
        <div className='createroom-button-wrapper'>
          <Button onClick={this.handleSubmit}>만들기</Button>
        </div>
      </Modal>
    )
  }
}

export default CreateRoomModal
