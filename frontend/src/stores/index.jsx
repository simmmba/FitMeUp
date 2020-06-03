import ConsultRequireStore from "./consultRequire";
import SearchStore from "./search";

class RootStore {
  constructor() {
    this.consultRequire = new ConsultRequireStore(this);
    this.search = new SearchStore(this);
  }
}

export default RootStore;
