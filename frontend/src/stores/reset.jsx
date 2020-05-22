import { action } from "mobx";

export default class ResetStore {
  constructor(root) {
    this.root = root;
  }
  @action
  resetFunc = () => {
    this.root.counter.number = 0;
  };
}
