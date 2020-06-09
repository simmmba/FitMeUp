import React, { Component } from 'react'
import './SidePanel.scss'

import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";

class SidePanel extends Component {
  state = {
    CreateRoomModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ CreateRoomModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ CreateRoomModalIsOpen: false });
  };

  render() {
    const { CreateRoomModalIsOpen } = this.state;
    const { currentUser } = this.props;

    return (
      <div className='chatting-side-panel'>
        <CreateRoomModal
          currentUser={currentUser}
          isOpen={CreateRoomModalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default SidePanel;
