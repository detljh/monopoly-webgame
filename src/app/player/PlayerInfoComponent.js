import React from 'react';
import './player.scss';

class PlayerInfoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let classes = ["player-info"];

        if (this.props.currentPlayer) {
            classes.push("active-player", `active-${this.props.player.id}`);
        }

        if (this.props.player.jailTurns > 0) {
            classes.push("in-jail");
        }

        return (
            <div className={classes.join(" ")}>
                <div className="player-info-header">
                    <b>{this.props.player.name}</b>
                    <div className="player-icon" id={this.props.player.id}></div>
                </div>
                <div className="player-info-body">
                    ${this.props.player.money}
                </div>
            </div>
        )
    }
}

export default PlayerInfoComponent;