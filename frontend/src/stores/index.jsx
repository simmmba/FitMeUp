import CounterStore from "./counter";
import ResetStore from "./reset";
import MarketStore from "./market";
import ConsultRequireStore from "./consultRequire";

class RootStore {
  constructor() {
    this.counter = new CounterStore(this);
    this.reset = new ResetStore(this);
    this.market = new MarketStore(this);
    this.consultRequire = new ConsultRequireStore(this);
  }
}

export default RootStore;
