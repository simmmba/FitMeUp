import React, { Component } from 'react'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Tooltip from '@material-ui/core/Tooltip'
import './SidePanel.scss'

import CreateRoomModal from './CreateRoomModal/CreateRoomModal'

class SidePanel extends Component {
  state = {
    CreateRoomModalIsOpen: false,
  }

  openModal = () => {
    this.setState({ CreateRoomModalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ CreateRoomModalIsOpen: false })
  }

  render () {
    const { CreateRoomModalIsOpen } = this.state
    const { currentUser } = this.props

    return (
      <div className='chatting-side-panel'>
        {/* <button onClick={this.openModal} type='button'>
          <Tooltip title='방 만들기'>
            <AddBoxIcon className='icon' />
          </Tooltip>
        </button> */}
        <CreateRoomModal
          currentUser={currentUser}
          isOpen={CreateRoomModalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}

export default SidePanel
