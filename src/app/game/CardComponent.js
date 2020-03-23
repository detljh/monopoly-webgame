import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faQuestion } from '@fortawesome/free-solid-svg-icons';

const CardComponent = (props) => {
    return (
        <div className="card">
            {props.card.type === "Community Chest" && <FontAwesomeIcon id="card-icon" icon={faArchive} />}
            {props.card.type === "Chance" && <FontAwesomeIcon id="card-icon" icon={faQuestion} />}
            <div id="card-header">
                <h3>{props.card.type}</h3>
            </div>

            <div id="card-body">
                <p>{props.card.text}</p>
                
                <div className="card-buttons">
                {props.card.button ? 
                    [
                        <button key={"ok_button"} className="main-buttons" onClick={props.completeCard}>{props.card.button}</button>,
                        <button key={"chance_button"} className="main-buttons" onClick={props.drawChance}>{props.card.drawChance}</button>
                    ]
                :  <button className="main-buttons" onClick={props.completeCard}>OK</button>
                }
                </div>
            </div>
        </div>
    )
}

export default CardComponent;