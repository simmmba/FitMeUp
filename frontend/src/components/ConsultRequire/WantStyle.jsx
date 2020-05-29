import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import "./WantStyle.scss";

const WantStyle = ({ setConsult, consult, style, setWantStyleSelect, next, previous }) => {
  let list = consult.gender === "여자" ? style.fstyle : style.mstyle;
  let [select] = useState(consult.want);

  const click = (event) => {
    const idx = event.target.id;
    const click = document.getElementById(idx);

    // 선택 효과
    if (!list[idx].select) {
      click.style.opacity = 0.3;
      select.push({ val: list[idx].val, img: list[idx].img });
    }

    // 선택 취소 효과
    else {
      const val = list[idx].val;
      const i = select.indexOf((list[idx]["val"] = val));
      select.splice(i, 1);
      click.style.opacity = 1;
    }

    setWantStyleSelect(idx);
  };

  const styleList = list.map((l, idx) => (
    <div className="imgBox" key={idx} onClick={click}>
      <img className={l.select ? "selected" : "notSelcted"} id={idx} src={"/img/wantStyle/" + l.img} alt={l.val} />
    </div>
  ));

  const selectCheck = () => {
    if (select.length === 0) alert("원하는 스타일을 한 개 이상 선택해주세요");
    else {
      setConsult("want", select);
      // console.log(consult.want);
      next();
    }
  };

  const moveBtn = () => {
    return (
      <div>
        <div className="guide">한 개 이상 선택해 주세요, 여러 개 선택 가능합니다.</div>
        <div className="select">{styleList}</div>
        <div className="btnBox">
          <button className="preBtn" onClick={previous}>
            이전
          </button>
          <button className="nextBtn" onClick={selectCheck}>
            다음
          </button>
        </div>
      </div>
    );
  };

  return <div className="">{moveBtn()}</div>;
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  style: consultRequire.style,
  setWantStyleSelect: consultRequire.setWantStyleSelect,
  next: consultRequire.next,
  previous: consultRequire.previous,
}))(observer(WantStyle));
