import { observable, action, computed } from "mobx";

export default class ChattingStore {
  constructor(root) {
    this.root = root;
  }

  @observable currentRoom = null;

  @action
  setCurrentRoom(room){
    this.currentRoom = room;
  }

  @action
  clearRoom = () => {
    this.currentRoom = null;
  }
}
