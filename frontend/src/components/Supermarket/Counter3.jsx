import React, { Component } from "react";
import { observer, inject } from "mobx-react";

// 하나 이상의 스토어 가져오기
@inject((stores) => ({
  counter: stores.counter,
  reset: stores.reset,
}))
@observer
class Counter extends Component {
  render() {
    const { counter, reset } = this.props;
    return (
      <div>
        <h1>제곱된 값 : {counter.total}</h1>
        <h1>현재 값 : {counter.number}</h1>
        <button onClick={counter.increase}>+1</button>
        <button onClick={counter.decrease}>-1</button>
        <button onClick={reset.resetFunc}>reset</button>
      </div>
    );
  }
}

export default Counter;
