import React from 'react';

const CardComponent = (props) => {
    return (
        <div className="card">
            <h3>{props.card.type}</h3>
            <p>{props.card.text}</p>
            {
                props.card.button ? 
                    <div className="card-buttons">
                        <button onClick={props.completeCard}>{props.card.button}</button>
                        <button onClick={props.drawChance}>{props.card.drawChance}</button>
                    </div>
                :  <button onClick={props.completeCard}>OK</button>
        
            }
        </div>
    )
}

export default CardComponent;