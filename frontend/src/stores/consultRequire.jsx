import { observable, action } from "mobx";
// import { observable, action, computed } from "mobx";

export default class CounterStore {
  constructor(root) {
    this.root = root;
  }

  // @observable 지정 state : 관찰대상으로 지정되고 state 값이 변경될 때 마다 Rerendering
  @observable questions = [
    "추천받을 스타일의 성별, 나이를 입력해주세요",
    "사이즈를 알려주세요",
    "어떤 스타일을 원하시나요?",
    "현재 나의 스타일은?",
    "예산이 어떻게 되나요?",
    "상담 가능 시간을 선택해주세요",
    "추가 참고사항을 남겨주세요.",
  ];
  @observable num = 0;
  @observable percent = 10;

  @observable consult = {
    stylist_id: null,
    category: "coordi", // 코디 추천 / 내옷 코디
    gender: null, // 1-1. 성별 (필수)
    age: "", // 1-2. 나이 (필수)
    top: "", // 2-1. 상의 사이즈 (선택, 성별에 따라 다르게 보이도록)
    bottom: "", // 2-2. 하의 사이즈 (선택, 성별에 따라 다르게 보이도록)
    height: "", // 2-3. 키 (선택)
    weight: "", // 2-4. 몸무게 (선택)
    want: [], // 3. 원하는 스타일 (필수, 성별에 따라 다르게 보이도록)
    current_img: [], // 4. 평소 스타일 (필수, 성별에 따라 다르게 보이도록)
    current_base64: [], // 4. 평소 스타일 (필수, 성별에 따라 다르게 보이도록)
    budget: "", // 5. 예산 (선택)
    start_time: 0, // 6-1. 상담 가능 시작 시간 (선택)
    end_time: 24, // 6-2. 상담 가능 종료 시간 (선택)
    contents: "", // 7. 추가 참고사항(직업, 특수 목적 등)
  };

  @observable size = {
    ftop: ["여성 상의 사이즈 선택", 85, 90, 95, 100, 105, 110, "XS", "S", "M", "L", "XL"],
    mtop: ["남성 상의 사이즈 선택", 90, 95, 100, 105, 110, 115, "S", "M", "L", "XL", "XXL"],
    fbottom: ["여성 하의 사이즈 선택", 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    mbottom: ["남성 하의 사이즈 선택", 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  };

  @observable
  style = {
    fstyle: [
      { val: "캐주얼", img: "f_casual.jpg", select: false },
      { val: "세미캐주얼", img: "f_semiCasual.jpg", select: false },
      { val: "스트릿", img: "f_street.jpg", select: false },
      { val: "보헤미안", img: "f_bohemian.jpg", select: false },
      { val: "빈티지", img: "f_vintage.jpg", select: false },
      { val: "애슬레저", img: "f_athleisure.jpg", select: false },
      { val: "걸리시", img: "f_girlish.jpg", select: false },
      { val: "페미닌", img: "f_feminine.jpg", select: false },
      { val: "정장", img: "f_suit.jpg", select: false },
    ],

    mstyle: [
      { val: "캐주얼", img: "m_casual.jpg", select: false },
      { val: "스트릿", img: "m_street.jpg", select: false },
      { val: "레이어드", img: "m_layered.jpg", select: false },
      { val: "애슬레저", img: "m_athleisure.jpg", select: false },
      { val: "밀리터리", img: "m_military.jpg", select: false },
      { val: "빈티지", img: "m_vintage.jpg", select: false },
      { val: "댄디", img: "m_dandy.jpg", select: false },
      { val: "세미정장", img: "m_businessCasual.jpg", select: false },
      { val: "정장", img: "m_suit.jpg", select: false },
    ],
  };

  // @action 지정 메소드 : @observable로 지정된 property 변경
  @action
  next = () => {
    this.num++;
    this.percent += 15;
  };

  @action
  previous = () => {
    this.num--;
    this.percent -= 15;
  };

  @action
  setConsult = (type, select) => {
    this.consult[type] = select;
  };

  @action
  reset = () => {
    this.stylist_id = null;
    this.num = 0;
    this.percent = 10;
    this.consult.gender = null;
    this.consult.age = "";
    this.consult.top = "";
    this.consult.bottom = "";
    this.consult.height = "";
    this.consult.weight = "";
    this.consult.want = [];
    this.consult.current_img = [];
    this.consult.current_base64 = [];
    this.consult.budget = "";
    this.consult.start_time = 0;
    this.consult.end_time = 24;
    this.consult.contents = "";
    this.style = {
      fstyle: [
        { val: "캐주얼", img: "f_casual.jpg", select: false },
        { val: "세미캐주얼", img: "f_semiCasual.jpg", select: false },
        { val: "스트릿", img: "f_street.jpg", select: false },
        { val: "보헤미안", img: "f_bohemian.jpg", select: false },
        { val: "빈티지", img: "f_vintage.jpg", select: false },
        { val: "애슬레저", img: "f_athleisure.jpg", select: false },
        { val: "걸리시", img: "f_girlish.jpg", select: false },
        { val: "페미닌", img: "f_feminine.jpg", select: false },
        { val: "정장", img: "f_suit.jpg", select: false },
      ],

      mstyle: [
        { val: "캐주얼", img: "m_casual.jpg", select: false },
        { val: "스트릿", img: "m_street.jpg", select: false },
        { val: "레이어드", img: "m_layered.jpg", select: false },
        { val: "애슬레저", img: "m_athleisure.jpg", select: false },
        { val: "밀리터리", img: "m_military.jpg", select: false },
        { val: "빈티지", img: "m_vintage.jpg", select: false },
        { val: "댄디", img: "m_dandy.jpg", select: false },
        { val: "세미정장", img: "m_businessCasual.jpg", select: false },
        { val: "정장", img: "m_suit.jpg", select: false },
      ],
    };
  };

  @action
  setWantStyleSelect = (idx) => {
    if (this.consult.gender === "여자") this.style.fstyle[idx].select = !this.style.fstyle[idx].select;
    else this.style.mstyle[idx].select = !this.style.mstyle[idx].select;
  };

  // @computed :
  // getter 함수에만 사용 가능
  // 반환하는 값이 변경되 었을 때 rerendering을 하는데, 값이 변경 되었다 하더라도 변경되기 전과 같은 값이라면 불필요하게 rerendering을 하지 않는다.
  // @computed
  // get total() {
  //   return this.number * this.number;
  // }
}
