import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faQuestion, faTrain, faLightbulb, faTint, faCoins, faLandmark, faCarSide } from '@fortawesome/free-solid-svg-icons';

const SquareComponent = (props) => {
    return (
        <div className="square" id={`square-${props.id}`}>
            {
                props.square.owned &&
                <div className={`${props.square.type} owned-property`} id={props.square.playerOwned}>      
                </div> 
            }
            <div className={props.square.type}>
                <div id="player-on-square-container">
                    {
                        props.playersOnSquare.map(player => 
                            <div key={player} className="player-on-square player-icon" id={player}></div>
                        )
                    }
                </div>

                {
                    props.freeParking > -1 ? <p className="square-cost">{props.freeParking}</p> 
                    : <p className="square-cost">{(props.square.type.includes("property") || ["tax", "station", "utility"].some(e => props.square.subtype.includes(e))) && `$${props.square.cost}`}</p>
                }
                {props.freeParking > -1 && <FontAwesomeIcon className="square-icon" id="free-park-icon" icon={faCarSide} />}
                {props.square.subtype === 'chest' && <FontAwesomeIcon className="square-icon" id="chest-icon" icon={faArchive} />}
                {props.square.subtype === 'chance' && <FontAwesomeIcon className="square-icon" id="chance-icon" icon={faQuestion} />}
                {props.square.subtype === 'station' && <FontAwesomeIcon className="square-icon" id="station-icon" icon={faTrain} />}
                {props.square.subtype === 'tax' && <FontAwesomeIcon className="square-icon" id="tax-icon" icon={faCoins} />}
                {props.square.subtype === 'go-jail' && <FontAwesomeIcon className="square-icon" id="go-jail-icon" icon={faLandmark} />}
                {props.square.text.includes("Electric") && <FontAwesomeIcon className="square-icon" id="electric-icon" icon={faLightbulb} />}
                {props.square.text.includes("Water") && <FontAwesomeIcon className="square-icon" id="water-icon" icon={faTint} />}

                <p className="square-name">{props.square.text}</p>
                {props.square.subtype === 'start' && <p id="start-icon">GO</p>}
                <div className={props.square.subtype}>
                        {props.square.owned && (props.square.houses >= 0 &&
                        (props.square.houses < 5 ? <p className="owned-text">Houses: {props.square.houses}</p>
                        : <p className="owned-text">Hotel</p>))}
                </div>
            </div>
        </div>
    );
}

export default SquareComponent;