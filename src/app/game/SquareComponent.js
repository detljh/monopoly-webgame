import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faQuestion, faTrain, faLightbulb, faTint, faCoins, faLandmark, faCarSide, faUserLock, faHome, faHotel } from '@fortawesome/free-solid-svg-icons';

class SquareComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <div className="square" id={`square-${this.props.id}`} onMouseEnter={(e) => this.props.updateHover(e, true, this.props.square)} onMouseLeave={(e) => this.props.updateHover(e, false, {})}>
                {
                    this.props.square.owned &&
                    <div className={`${this.props.square.type} owned-property`} id={this.props.square.playerOwned}>      
                    </div> 
                }
    
                <div id="player-on-square-container">
                    {
                        this.props.playersOnSquare.map(player => {
                            let classes = ["player-on-square", "player-icon"];
                            if (player === this.props.currentPlayer.id) {
                                classes.push("active-player-board");
                            }
                            return <div key={player} className={classes.join(" ")} id={player}></div>
                        })
                    }
                </div>
    
                <div className={this.props.square.type}>
                    
    
                    {
                        this.props.freeParking > -1 ? <p className="square-cost">{this.props.freeParking}</p> 
                        : <p className="square-cost">{(this.props.square.type.includes("property") || ["tax", "station", "utility"].some(e => this.props.square.subtype.includes(e))) && `$${this.props.square.cost}`}</p>
                    }
                    {this.props.freeParking > -1 && <FontAwesomeIcon className="square-icon" id="free-park-icon" icon={faCarSide} />}
                    {this.props.square.subtype === 'chest' && <FontAwesomeIcon className="square-icon" id="chest-icon" icon={faArchive} />}
                    {this.props.square.subtype === 'chance' && <FontAwesomeIcon className="square-icon" id="chance-icon" icon={faQuestion} />}
                    {this.props.square.subtype === 'station' && <FontAwesomeIcon className="square-icon" id="station-icon" icon={faTrain} />}
                    {this.props.square.subtype === 'tax' && <FontAwesomeIcon className="square-icon" id="tax-icon" icon={faCoins} />}
                    {this.props.square.subtype === 'go-jail' && <FontAwesomeIcon className="square-icon" id="go-jail-icon" icon={faLandmark} />}
                    {this.props.square.text.includes("Electric") && <FontAwesomeIcon className="square-icon" id="electric-icon" icon={faLightbulb} />}
                    {this.props.square.text.includes("Water") && <FontAwesomeIcon className="square-icon" id="water-icon" icon={faTint} />}
                    {
                        this.props.square.subtype === 'jail' && 
                        [
                            <div id="jail-square"><FontAwesomeIcon className="square-icon" id="jail-icon" icon={faUserLock}></FontAwesomeIcon></div>,
                            <div id="just"><p>JUST</p></div>,
                            <div id="visiting"><p>VISITING</p></div>
                        ]
                    }
    
                    <p className="square-name">{this.props.square.text}</p>
                    {this.props.square.subtype === 'start' && <p id="start-icon">GO</p>}
    
                    {
                        this.props.square.type.includes("property") &&      
                        <div className={`street ${this.props.square.subtype}-color`}>
                                {this.props.square.owned && (this.props.square.houses >= 0 &&
                                (this.props.square.houses < 5 ? 
                                    [...Array(this.props.square.houses).keys()].map(house => 
                                         <FontAwesomeIcon className="house" icon={faHome} />)
                                : <FontAwesomeIcon className="house" id="hotel" icon={faHotel} />))}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SquareComponent;