import React from 'react';

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            property: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            property: event.target.value
        });
    }

    render() {
        return (
            <div className="menu" id={this.props.id}>
                <select name="property" size={this.props.properties.length + 2} onChange={this.handleChange}>
                    <option className="header-option" disabled>{this.props.header}</option>
                    {
                        this.props.properties.map((option) =>
                            <option key={option.propertyPosition} className="menu-options" value={option.propertyPosition}>{option.name}, {option.type}, ${option.cost}</option>
                        )
                    }
                </select>
    
                <div className="menu-buttons">
                    <button key={'menu-back'} onClick={this.props.goPrevGameState}>Back</button>
                    <button key={'menu-buy'} onClick={() => this.props.action(this.state.property)}>{this.props.actionText}</button>
                </div>
            </div>
        )
    }
}

export default MenuComponent;