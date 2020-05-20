import React from "react";
import "./MatchingList.scss";

import { MdRemoveCircleOutline } from "react-icons/md";

const MatchingList = () => {
  return (
    <div className="MatchingList">
      <div className="style_conditions">
        <div className="items">남</div>
        <div className="items">
          171cm
          <br />
          70kg
        </div>
        <div className="items">
          32
          <br />
          33
        </div>
        <div className="items">50,000</div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default MatchingList;
