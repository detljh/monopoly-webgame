import React from 'react';

const CardComponent = (props) => {
    return (
        <div className="card">
            <h3>{props.card.type}</h3>
            <p>{props.card.text}</p>
            <button onClick={props.completeCard}>OK</button>
        </div>
    )
}

export default CardComponent;