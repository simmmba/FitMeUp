import React, { Component } from 'react';
import Modal from 'react-modal';
import mime from 'mime-types';
import './FileUploadModal.scss';

import Button from './Common/Button';

class FileUploadModal extends Component {
  state = {
    file: null,
    authorized: ['image/jpeg', 'image/png'],
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  /**
   * 파일의 mime type의 유효성을 검사합니다. mime.lookup(file)은 해당 파일의 mime type을 리턴합니다.
   * @param filename
   * @return boolean
   */
  isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

  clearFile = () => this.setState({ file: null });

  render() {
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
    };

    const { isOpen, closeModal } = this.props;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <input
          id="file"
          name="file"
          type="file"
          placeholder="File types: jpg, png"
          onChange={this.addFile}
        />
        <div className='filemodal-button-wrapper'>
          <Button onClick={this.sendFile}>전송</Button>
        </div>
      </Modal>
    );
  }
}

export default FileUploadModal;
