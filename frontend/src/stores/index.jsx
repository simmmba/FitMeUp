import ConsultRequireStore from "./consultRequire";
import ChattingStore from "./chatting"
import SearchStore from "./search";
import FilterStore from "./filter"

class RootStore {
  constructor() {
    this.consultRequire = new ConsultRequireStore(this);
    this.chatting = new ChattingStore(this);
    this.search = new SearchStore(this);
    this.filter = new FilterStore(this);
  }
}

export default RootStore;
