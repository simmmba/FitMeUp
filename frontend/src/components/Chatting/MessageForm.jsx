import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from '../../firebaseConfig'
import { v4 as uuidv4 } from 'uuid'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import Tooltip from '@material-ui/core/Tooltip'
import './MessageForm.scss'

import FileUploadModal from './FileUploadModal'
import ProgressBar from './ProgressBar'

@inject('chatting')
@observer
class MessageForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    percentUploaded: 0,
    message: '',
    messagesRef: firebase.database().ref('messages'),
    fileUploadModalIsOpen: false
  }

  openModal = () => {
    this.setState({ fileUploadModalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ fileUploadModalIsOpen: false })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  /**
   * message 객체를 반환합니다. message 객체는 file의 유무에 따라 사진 혹은 텍스트를 가지고 있습니다.
   * @return message obj
   * @param fileUrl
   */
  createMessage = (fileUrl = null) => {
    const { currentUser } = this.props

    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.id,
        nickname: currentUser.nickname,
        profile_img: currentUser.profile_img,
        type: currentUser.type
      }
    }
    if (fileUrl !== null) {
      message.image = fileUrl
    } else {
      message.content = this.state.message
    }
    return message
  }

  /**
   * message 객체를 현재 방 id의 밑으로 저장합니다.
   * messages: {
   *  roomId : {
   *    messageId : {
   *      content: string,
   *      id: string,
   *      users: array
   *    }
   *  }
   * }
   */
  sendMessage = () => {
    const { scrollDown } = this.props
    const { currentRoom } = this.props
    const { message, messagesRef } = this.state

    if (message && this.messageCheck(message)) {
      messagesRef
        .child(currentRoom.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ message: '' })
          scrollDown()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  messageCheck = message => {
    if(message.replace(/(\s*)/g, '') === '') return false
    return true;
  }

  keyPress = event => {
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }

  /**
   * 구글 storage에 image를 업로드합니다.
   */
  uploadFile = (file, metadata) => {
    const { currentRoom } = this.props
    const pathToUpload = currentRoom.id
    const ref = this.state.messagesRef
    const filePath = `images/${uuidv4()}.jpg`

    this.setState(
      state => ({
        uploadTask: state.storageRef.child(filePath).put(file, metadata)
      }),
      () => {
        this.state.uploadTask.on(
          'state_changed',
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            )
            this.setState({ percentUploaded })
          },
          err => {
            console.error(err)
            this.setState({ uploadTask: null })
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload)
              })
              .catch(err => {
                console.error(err)
                this.setState({
                  uploadTask: null
                })
              })
          }
        )
      }
    )
  }

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ percentUploaded: 0 })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render () {
    const { fileUploadModalIsOpen, percentUploaded } = this.state
    const { currentRoom } = this.props
    return (
      <div className='message-form'>
        <div className='message-form-content'>
          <button
            disabled={!currentRoom}
            type='button'
            className='upload-button'
            onClick={this.openModal}
          >
            <Tooltip title='사진 업로드'>
              <PhotoLibraryIcon className='upload-icon' />
            </Tooltip>
          </button>
          <input
            disabled={!currentRoom}
            placeholder={
              currentRoom ? '메세지를 적어주세요' : '방을 생성해주세요'
            }
            onKeyPress={this.keyPress}
            onChange={this.handleChange}
            className='message-input'
            id='message'
            value={this.state.message}
            name='message'
            type='text'
            autoComplete='off'
          />
        </div>
        <ProgressBar completed={percentUploaded} />
        <FileUploadModal
          isOpen={fileUploadModalIsOpen}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
      </div>
    )
  }
}

export default MessageForm
