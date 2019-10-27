import React from 'react';

export default function Advancement(props) {
    function changeExp(add) {
        if ((add && props.experience < 10) || (!add && props.experience > 0)) {
            props.updateState('experience', add ? props.experience + 1 : props.experience - 1);
        }
    }

    function expBar() {
        let bars = [];
        for (let i = 0; i < 10; i++) {
            bars.push(<div key={i} className="exp-bar-segment"></div>)
        }
        return (
            <div id="exp-bar" style={{backgroundPosition: `${100 - 10 * props.experience}% 0%`}}>
                {bars}
            </div>
        )
    }
    
    return (
        <div id="advancement-containe">
            <div id="exp-tracker">
                <button onClick={() => changeExp(false)}>-</button>
                {expBar()}
                <button onClick={() => changeExp(true)}>+</button>
            </div>
        </div>
    )
}