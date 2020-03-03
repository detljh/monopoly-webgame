import React from 'react';

const SquareComponent = (props) => {
    return (
        <div className={props.type}>
            <p class="square-name">{props.text}</p>
            <div class={props.subtype}>
            </div>
        </div>
    );
}

export default SquareComponent;