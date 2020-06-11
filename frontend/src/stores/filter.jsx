import { observable, action } from "mobx";

export default class FilterStore {
  constructor(root) {
    this.root = root;
  }

  // @observable 지정 state : 관찰대상으로 지정되고 state 값이 변경될 때 마다 Rerendering
  @observable filter = "0";
  @observable category = 0;
  @observable gender = 0;
  @observable date = 0;
  @observable apply = 0;

  // @action 지정 메소드 : @observable로 지정된 property 변경
  @action
  setFilter = (filter) => {
    this.filter = filter;
  };

  @action
  setCategory = (category) => {
    this.category = category;
  };

  @action
  setGender = (gender) => {
    this.gender = gender;
  };

  @action
  setDate = (date) => {
    this.date = date;
  };

  @action
  setApply = (apply) => {
    this.apply = apply;
  };

  @action
  freset = () => {
    this.filter = "0";
    this.category = 0;
    this.gender = 0;
    this.date = 0;
    this.apply = 0;
  };
}
