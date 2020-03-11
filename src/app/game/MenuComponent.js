import React from 'react';

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: '',
            options: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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

    render() {
        let data = this.props.multiple ? this.state.options : this.state.option;
        return (
            <div className="menu" id={this.props.id}>
                <select name="property" size={this.props.items.length + 2} onChange={this.handleChange} multiple={this.props.multiple}>
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
    
                <div className="menu-buttons">
                    <button key={'menu-back'} onClick={this.props.back}>Back</button>
                    <button key={'menu-buy'} onClick={() => this.props.action(data)}>{this.props.actionText}</button>
                </div>
            </div>
        )
    }
}

export default MenuComponent;