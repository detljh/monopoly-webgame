import React from 'react';
import './player.scss';

class PlayerInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        }
    }

    showDetails(value) {
        this.setState({
            isHovered: value
        });
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
            <div className={classes.join(" ")} onMouseEnter={() => this.showDetails(true)} onMouseLeave={() => this.showDetails(false)}>
                <div className="player-info-header">
                    <b>{this.props.player.name}</b>
                    <div className="player-icon" id={this.props.player.id}></div>
                </div>
                <div className="player-info-body">
                    <span>${this.props.player.money}</span>
                    {this.state.isHovered && <span id="jail-card">{this.props.player.jailCard} Jail Card(s)</span>}
                </div>
            </div>
        )
    }
}

export default PlayerInfoComponent;