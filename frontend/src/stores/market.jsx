import { observable, action, computed } from "mobx";

export default class MarketStore {
  @observable selectedItems = [];

  constructor(root) {
    this.root = root;
  }

  // 장바구니에 추가
  @action
  put = (name, price) => {
    const { number } = this.root.counter;
    // 존재하는지 찾기
    const exists = this.selectedItems.find((item) => item.name === name);

    // 존재하지 않으면 새로 집어넣기
    if (!exists) {
      this.selectedItems.push({
        name,
        price,
        // count: 1,
        count: number,
      });
      return;
    }

    // 존재한다면
    exists.count += number;
    // exists.count++;
  };

  // 장바구니에서 제거
  @action
  take = (name) => {
    const itemToTake = this.selectedItems.find((item) => item.name === name);
    itemToTake.count--;

    if (itemToTake.count === 0) {
      this.selectedItems.remove(itemToTake);
    }
  };

  @computed
  get total() {
    return this.selectedItems.reduce((previus, current) => {
      return previus + current.price * current.count;
    }, 0);
  }
}
