import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
// import "./CurrentStyle.scss";

// 특정 스토어만 가져오기
@inject((stores) => ({
  previous: stores.consultRequire.previous,
  next: stores.consultRequire.next,
}))
@observer
class CurrentStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  moveBtn = () => {
    const { previous, next } = this.props;

    return (
      <div className="btnBox">
        <button className="preBtn" onClick={previous}>
          이전
        </button>
        <button className="nextBtn" onClick={next}>
          다음
        </button>
      </div>
    );
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    return (
      <div>
        <input type="file" onChange={this._handleImageChange} />
        {$imagePreview}
        {this.moveBtn()}
      </div>
    );
  }
}
export default CurrentStyle;
