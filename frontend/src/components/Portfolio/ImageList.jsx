import React from "react";
import "./ImageList.scss";

// import prevButton from "../../img/prevButton.png";
// import nextButton from "../../img/nextButton.png";

class ImageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      img_list: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.setState({
      check: true,
      img_list: this.props.img_list,
    });
  }

  // 최대 10개까지만 이미지 보이게 하기
  render() {
    return (
      <div className="ImageList">
        {this.state.img_list !== undefined ? (
          <>
            <div className="thumbnail">
              <div id="square" className="centered">
                <img
                  alt="main_img"
                  className="img"
                  src={this.state.img_list}
                  onClick={() => {
                    window.open(this.state.img_list);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ImageList;
