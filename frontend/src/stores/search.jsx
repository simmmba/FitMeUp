import { observable, action } from "mobx";
// import { observable, action, computed } from "mobx";

export default class SearchStore {
  constructor(root) {
    this.root = root;
  }

  // @observable 지정 state : 관찰대상으로 지정되고 state 값이 변경될 때 마다 Rerendering
  @observable first = true;
  @observable option = "";
  @observable order = "review";
  @observable keyword = "";
  @observable result = null;

  // @action 지정 메소드 : @observable로 지정된 property 변경
  @action
  setOption = (option) => {
    this.option = option;
  };

  @action
  setOrder = (order) => {
    this.order = order;
  };

  @action
  setKeyword = (keyword) => {
    this.keyword = keyword;
  };

  @action
  setResult = (result) => {
    this.result = result;
  };

  @action
  setFirst = () => {
    this.first = false;
  };

  @action
  reset = () => {
    this.first = true;
    this.option = "";
    this.order = "review";
    this.keyword = "";
    this.result = [];
  };

  // @computed :
  // getter 함수에만 사용 가능
  // 반환하는 값이 변경되 었을 때 rerendering을 하는데, 값이 변경 되었다 하더라도 변경되기 전과 같은 값이라면 불필요하게 rerendering을 하지 않는다.
  //   @computed
  //   get total() {
  //     return this.number * this.number;
  //   }
}
