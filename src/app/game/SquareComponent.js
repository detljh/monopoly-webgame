import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faQuestion, faTrain, faLightbulb, faTint, faCoins, faLandmark, faCarSide, faUserLock, faHome, faHotel } from '@fortawesome/free-solid-svg-icons';

const SquareComponent = (props) => {
    return (            
        <div className="square" id={`square-${props.id}`} onMouseEnter={(e) => props.updateHover(e, true, props.square)} onMouseLeave={(e) => props.updateHover(e, false, {})}>
            {
                props.square.owned &&
                <div className={`${props.square.type} owned-property`} id={props.square.playerOwned}>      
                </div> 
            }

            <div id="player-on-square-container">
                {
                    props.playersOnSquare.map(player => {
                        let classes = ["player-on-square", "player-icon"];
                        if (player === props.currentPlayer.id) {
                            classes.push("active-player-board");
                        }
                        return <div key={player} className={classes.join(" ")} id={player}></div>
                    })
                }
            </div>

            <div className={props.square.type}>
                

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
                {
                    props.square.subtype === 'jail' && 
                    [
                        <div key={`${props.square.text}_icon`} id="jail-square"><FontAwesomeIcon className="square-icon" id="jail-icon" icon={faUserLock}></FontAwesomeIcon></div>,
                        <div key={`${props.square.text}_just`} id="just"><p>JUST</p></div>,
                        <div key={`${props.square.text}_visiting`} id="visiting"><p>VISITING</p></div>
                    ]
                }

                <p className="square-name">{props.square.text}</p>
                {props.square.subtype === 'start' && <p id="start-icon">GO</p>}

                {
                    props.square.type.includes("property") &&      
                    <div className={`street ${props.square.subtype}-color`}>
                            {props.square.owned && (props.square.houses >= 0 &&
                            (props.square.houses < 5 ? 
                                [...Array(props.square.houses).keys()].map(house => 
                                        <FontAwesomeIcon key={house} className="house" icon={faHome} />)
                            : <FontAwesomeIcon className="house" id="hotel" icon={faHotel} />))}
                    </div>
                }
            </div>
        </div>
    );
}

export default SquareComponent;