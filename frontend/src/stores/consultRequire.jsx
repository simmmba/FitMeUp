import { observable, action, computed } from "mobx";

export default class CounterStore {
  constructor(root) {
    this.root = root;
  }

  // @observable 지정 state : 관찰대상으로 지정되고 state 값이 변경될 때 마다 Rerendering
  @observable questions = [
    "어떤 성별의 스타일을 추천받을건가요?",
    "사이즈를 알려주세요",
    "어떤 스타일을 원하시나요?",
    "현재 나의 스타일은?",
    "예산이 어떻게 되나요?",
    "상담 가능 시간을 입력해주세요",
    "추가 참고사항을 남겨주세요.",
  ];
  @observable num = 0;
  @observable percent = 2;

  @observable consult = {
    category: "코디 추천", // 코디 추천 / 내옷 코디
    gender: "", // 1. 성별
    top: null, // 2-1. 상의 사이즈 (성별에 따라 다르게 보이도록)
    bottom: null, // 2-2. 하의 사이즈 (성별에 따라 다르게 보이도록)
    height: null, // 2-3. 키
    weight: null, // 2-4. 몸무게
    want: [], // 3. 원하는 스타일 (성별에 따라 다르게 보이도록)
    current_img: [], // 4. 평소 스타일 (성별에 따라 다르게 보이도록)
    budget: null, // 5. 예산
    start_time: null, // 6-1. 상담 가능 시작 시간
    end_time: null, // 6-2. 상담 가능 종료 시간
    contents: null, // 7. 추가 참고사항(직업, 특수 목적 등)
  };

  @observable size = {
    ftop: [85, 90, 95, 100, 105, 110, "XS", "S", "M", "L", "XL"],
    mtop: [90, 95, 100, 105, 110, 115, "S", "M", "L", "XL", "XXL"],
    fbottom: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    mbottom: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  };

  // @action 지정 메소드 : @observable로 지정된 property 변경
  @action
  next = () => {
    if (this.num <= 6) {
      this.num++;
      this.percent += 14;
    }
  };

  @action
  previous = () => {
    if (this.num > 0) {
      this.num--;
      this.percent -= 14;
    }
  };

  @action
  setConsult = (type, select) => {
    this.consult[type] = select;
  };

  @action
  reset = () => {
    this.consult.gender = "";
    this.consult.top = null;
    this.consult.bottom = null;
    this.consult.height = null;
    this.consult.weight = null;
    this.consult.want = [];
    this.consult.current_img = [];
    this.consult.budget = null;
    this.consult.start_time = null;
    this.consult.end_time = null;
    this.consult.contents = null;
  };

  // @computed :
  // getter 함수에만 사용 가능
  // 반환하는 값이 변경되 었을 때 rerendering을 하는데, 값이 변경 되었다 하더라도 변경되기 전과 같은 값이라면 불필요하게 rerendering을 하지 않는다.
  @computed
  get total() {
    return this.number * this.number;
  }
}
