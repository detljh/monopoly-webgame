import React from 'react';
import './player.scss';

class PlayerInfoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let classes = ["player-info"];
        if (this.props.currentPlayer) {
            classes.push("active-player");
        }
        return (
            <div className={classes.join(" ")}>
                <div className="player-info-header">
                    <b>Player {this.props.name}</b>
                    <div className="player-icon" id={this.props.id}></div>
                </div>
                <div className="player-info-body">
                    <b>Money: </b> {this.props.money}
                </div>
            </div>
        )
    }
}

export default PlayerInfoComponent;