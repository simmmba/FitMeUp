import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

// 모든 스토어 가져오기
@inject('counter') // inject('스토어명')

@observer
class Counter extends Component {
    render() {
        const {counter} = this.props;
        return (
            <div>
                <h1>{counter.number}</h1>
                <button onClick={counter.increase}>+1</button>
                <button onClick={counter.decrease}>-1</button>
            </div>
        );
    }
}

export default Counter;