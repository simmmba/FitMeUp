import { observable, action, computed } from "mobx";

export default class CounterStore {
  @observable number = 1;

  constructor(root) {
    this.root = root;
  }

  @action
  increase = () => {
    this.number++;
  };

  @action
  decrease = () => {
    this.number--;
  };

  @computed
  get total() {
    return this.number * this.number;
  }
}
