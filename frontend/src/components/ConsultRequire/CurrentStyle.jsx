import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./CurrentStyle.scss";

const CurrentStyle = ({ setConsult, consult, previous, next }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(consult.current_img);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    console.log(fileList);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">사진 업로드</div>
    </div>
  );

  const setPass = () => {
    setConsult("current_img", []);
    next();
  };

  const setNext = () => {
    setConsult("current_img", fileList);
    next();
  };

  const moveBtn = () => {
    return (
      <div className="btnBox">
        <button className="preBtn" onClick={previous}>
          이전
        </button>
        <button className="passBtn" onClick={setPass}>
          건너뛰기
        </button>
        <button className="nextBtn" onClick={setNext}>
          다음
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="guide">최근 코디 사진이나 주로 입는 스타일의 사진을 업로드해 주세요.</div>
      <div className="clearfix">
        <Upload
          type="file"
          accept="image/gif, image/jpeg, image/png"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
      {moveBtn()}
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  percent: consultRequire.percent,
  previous: consultRequire.previous,
  next: consultRequire.next,
}))(observer(CurrentStyle));
