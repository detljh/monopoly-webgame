import React from 'react';

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: '',
            options: [],
            money: 0
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.handleMoney = this.handleMoney.bind(this);
    }

    handleSelect(event) {
        if (this.props.multiple) {
            this.setState({
                options: [...this.state.options, event.target.value]
            });
        } else {
            this.setState({
                option: event.target.value
            });
        }
        
    }

    handleMoney(event) {
        this.setState({
            money: event.target.value
        }); 
    }

    render() {
        let data = this.props.multiple ? this.state.options : this.state.option;
        return (
            <div className="menu" id={this.props.id}>
                <select name="property" size={this.props.items.length + 2} onChange={this.handleSelect} multiple={this.props.multiple}>
                    <option className="header-option" disabled>{this.props.header}</option>
                    {
                        this.props.items.map((option) =>
                            <option key={option.value} className="menu-options" value={option.value}>
                                {option.name}
                                {
                                    option.type &&
                                        `, ${option.type}`
                                }
                                {
                                    option.cost &&
                                        `, $${option.cost}`
                                }
                                </option>
                        )
                    }
                </select>
                {
                    this.props.multiple &&
                    [
                        <label>Money: {this.state.money}</label>,
                        <input type="range" min="0" max={this.props.maxMoney} onChange={this.handleMoney} defaultValue="0"></input>
                    ]
                }
    
                <div className="menu-buttons">
                    <button key={'menu-back'} onClick={this.props.back}>Back</button>
                    <button key={'menu-buy'} onClick={() => this.props.action(data, this.state.money)}>{this.props.actionText}</button>
                </div>
            </div>
        )
    }
}

export default MenuComponent;