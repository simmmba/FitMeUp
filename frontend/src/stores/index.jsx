import ConsultRequireStore from "./consultRequire";
import ChattingStore from "./chatting"
import SearchStore from "./search";

class RootStore {
  constructor() {
    this.consultRequire = new ConsultRequireStore(this);
    this.chatting = new ChattingStore(this);
    this.search = new SearchStore(this);
  }
}

export default RootStore;
