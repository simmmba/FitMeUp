import React from "react";
import { observer, inject } from "mobx-react";
import PicturesWall from "./PicturesWall";
import "./CurrentStyle.scss";

// 특정 스토어만 가져오기
@inject((stores) => ({
  previous: stores.consultRequire.previous,
  next: stores.consultRequire.next,
}))
@observer
class CurrentStyle extends React.Component {
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
    return (
      <div>
        <PicturesWall />
        {this.moveBtn()}
      </div>
    );
  }
}
export default CurrentStyle;
