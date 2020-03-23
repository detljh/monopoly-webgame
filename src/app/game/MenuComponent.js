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
            if (event.target.checked) {
                this.setState({
                    options: [...this.state.options, event.target.value]
                });
            } else {
                let options = [...this.state.options];
                options.splice(this.state.options.indexOf(event.target.value), 1);
                this.setState({
                    options: options
                });
            }
        } else {
            if (event.target.checked) {
                this.setState({
                    option: event.target.value
                });
            } else {
                this.setState({
                    option: ''
                });
            }
        }
    }

    handleMoney(event) {
        let money = event.target.value;
        if (money > this.props.maxMoney || money < 0){
            return;
        }
        this.setState({
            money: event.target.value
        }); 
    }

    render() {
        let data = this.props.multiple ? this.state.options : this.state.option;
        let options = this.props.items.map((option) => {
            let type = this.props.multiple ? "checkbox" : "radio";
            return [
                <input type={type} name="option" id={option.value} key={option.value} className="menu-options" onClick={this.handleSelect} value={option.value} />,
                <label key={`${option.value}_label`} htmlFor={option.value} className={`option-label ${option.color}-color`}>
                    
                    {option.name}
                    {
                        option.type &&
                            `, ${option.type}`
                    }
                    {
                        option.cost &&
                            `, $${option.cost}`
                    }
                </label>
            ]
        });
        return (
            <div className="menu" id={this.props.id}>
                <div key={"menu_options"} id="options">
                    <div className="header-option">{this.props.header}</div>
                    {options}
                </div>

                {
                    this.props.multiple &&
                    [
                        <div key={`money_header`} className="header-option">Money</div>,
                        <input key={`money_slider`} type="range" id="money-slider" min="0" max={this.props.maxMoney} onChange={this.handleMoney} value={this.state.money}></input>,
                        <input key={`money_number`} type="number" id="money-input" onChange={this.handleMoney} value={this.state.money}></input>
                    ]
                }
    
                <div className="menu-buttons">
                    <button key={'menu-back'} className="main-buttons" onClick={this.props.back}>Back</button>
                    <button key={'menu-buy'} className="main-buttons" onClick={() => this.props.action(data, this.state.money)}>{this.props.actionText}</button>
                </div>
            </div>
        )
    }
}

export default MenuComponent;