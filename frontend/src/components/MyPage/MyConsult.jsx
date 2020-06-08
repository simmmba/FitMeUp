import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const MyConsult = () => {
  return (
    <div className="middle_tab">
      <div className="center">
        <h3>
          <b>나의 상담 현황</b>
        </h3>
      </div>
    </div>
  );
};

export default MyConsult;
