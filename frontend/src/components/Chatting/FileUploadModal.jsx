import React, { Component } from "react";
import mime from "mime-types";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import "./FileUploadModal.scss";

import Button from "./Common/Button";
import DragAndDrop from "./Common/DragAndDrop";

class FileUploadModal extends Component {
  state = {
    files: [],
    authorized: ["image/jpeg", "image/png"],
  };

  /**
   * 파일의 mime type의 유효성을 검사합니다. mime.lookup(file)은 해당 파일의 mime type을 리턴합니다.
   * @param filename
   * @return boolean
   */
  isAuthorized = (filename) =>
    ["image/jpeg", "image/png"].includes(mime.lookup(filename));

  handleDrop = async (files) => {
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i] || !files[i].name || !this.isAuthorized(files[i].name)) {
        console.log(i + 1 + "번째 파일이 올바르지 않습니다");
        continue;
      }
      await fileList.push(files[i]);
    }

    this.setState({ files: [...this.state.files, ...fileList] });
  };

  sendFiles = (files) => {
    const { uploadFile, closeModal } = this.props;
    if (files.length === 0) return;
    const file = files.pop(0);
    const metadata = { contentType: mime.lookup(file.name) };
    uploadFile(file, metadata);
    closeModal();
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.handleDrop([file]);
    }
  };

  displayImages = () => {
    const { files } = this.state;
    return files.map((image, i) => {
      const imageURL = window.URL.createObjectURL(image);
      return (
        <div className="image-wrapper" key={i}>
          <img className="image" src={imageURL} alt={imageURL} />
        </div>
      );
    });
  };

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "80vw",
        height: "80vh",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
        background: "#fff",
        padding: "2rem",
        justifyContent: "center",
        boxShadow:
          "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,.3)",
      },
    };

    const dropbox = {
      position: "relative",
      width: "100%",
      height: "55vh",
    };
    const { files } = this.state;
    const { isOpen, closeModal } = this.props;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="button-box">
          <button onClick={() => document.getElementById("file-input").click()}>
            <AddIcon className="icon" />
          </button>
          <input
            id="file-input"
            name="file"
            type="file"
            onChange={this.addFile}
            style={{ display: "none" }}
          />
        </div>
        <DragAndDrop dropbox={dropbox} handleDrop={this.handleDrop}>
          <div className="dropbox">
            {files.length === 0 ? (
              <span className="dropbox-text">이미지를 올려주세요</span>
            ) : (
              <div className="images-box">{this.displayImages()}</div>
            )}
          </div>
        </DragAndDrop>
        <div className="filemodal-button-wrapper">
          <Button onClick={this.sendFile}>전송</Button>
        </div>
      </Modal>
    );
  }
}

export default FileUploadModal;
