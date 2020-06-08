import React, { Component } from "react";
import mime from "mime-types";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import "./FileUploadModal.scss";

import DragAndDrop from "./Common/DragAndDrop";

class FileUploadModal extends Component {
  state = {
    files: [],
    authorized: ["image/jpeg", "image/png"],
    selectedId: -1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.files.length !== this.state.files.length) {
      const divs = document.getElementsByName("image-wrapper");
      this.addClickEventListener(divs);
    }
  }

  addClickEventListener = (divs) => {
    divs.forEach((div) => {
      div.addEventListener("click", (event) => {
        this.setState({ selectedId: event.target.id });
      });
    });
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

  sendFiles = () => {
    console.log("dd");
    const { files } = this.state;
    const { setFiles } = this.props;
    if (files.length !== 0) {
      setFiles(files);
    }
    this.close();
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.handleDrop([file]);
    }
  };

  displayImages = () => {
    const { files, selectedId } = this.state;
    return files.map((image, i) => {
      const imageURL = window.URL.createObjectURL(image);
      return (
        <div
          className={`image-wrapper ${selectedId === `${i}` ? "clicked" : ""}`}
          key={i}
          name="image-wrapper"
          id={i}
        >
          <img className="image" src={imageURL} alt={imageURL} id={i} />
        </div>
      );
    });
  };

  close = () => {
    const { closeModal } = this.props;
    this.setState({ files: [] });
    closeModal();
  };

  removeImage = () => {
    const { selectedId } = this.state;
    const new_files = this.state.files;

    new_files.splice(selectedId, 1);
    this.setState({ files: new_files });
  };

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "80vw",
        marginRight: "-50%",
        transform: "translate(-50%, -45%)",
        border: "none",
        background: "#fff",
        padding: "1.5rem",
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
    const { isOpen, loader } = this.props;
    const disabled = (files.length === 0);
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={this.close}
        style={customStyles}
        ariaHideApp={false}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={this.close}>
            <ClearIcon className="clear-icon" />
          </button>
        </div>
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
          <button onClick={this.removeImage}>
            <RemoveIcon className="icon" />
          </button>
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
          <button
            className="send-btn"
            onClick={this.sendFiles}
            disabled={disabled}
          >
            {loader ? <div className="loader" /> : "전송"}
          </button>
        </div>
      </Modal>
    );
  }
}

export default FileUploadModal;
