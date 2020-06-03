import React, { Component } from "react";
import "./SidePanel.scss";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from "@material-ui/core/Tooltip";
// import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import firebase from "../../firebaseConfig";

export class SidePanel extends Component {
  state = {
    CreateRoomModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ CreateRoomModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ CreateRoomModalIsOpen: false });
  };

  handleLogout = () => {
    const { clearRoom, clearUser } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Logout"));
    clearRoom();
    clearUser();
  };

  render() {
    const { CreateRoomModalIsOpen } = this.state;
    const { currentUser } = this.props;
    return (
      <div className="chatting-side-panel">
        <button onClick={this.openModal} type="button">
          <Tooltip title="방 만들기" >
            <AddBoxIcon className="icon"/>
          </Tooltip>
        </button>
        {/* <CreateRoomModal
          currentUser={currentUser}
          isOpen={CreateRoomModalIsOpen}
          closeModal={this.closeModal}
        /> */}
      </div>
    );
  }
}

export default SidePanel;
