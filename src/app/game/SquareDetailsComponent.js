import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrain, faLightbulb, faTint } from '@fortawesome/free-solid-svg-icons';

class SquareDetailsComponent extends React.Component {
    render() {
        let container = {
            width: '170px',
            height: '240px',
            backgroundColor: 'white',
            border: '1px solid black',
            position: 'absolute',
            zIndex: '9',
            left: this.props.x > 950 ? this.props.x - 210 : this.props.x < 250 ? this.props.x + 10 : this.props.x,
            top: this.props.y < 200 ? this.props.y + 10 : this.props.y > 780 ? this.props.y - 210 : this.props.y
        };
        let header = {
            border: '2px solid black',
            margin: '5px',
            padding: '5px',
            textAlign: 'center'
        }
        let body = {
            padding: '5px',
            marginTop: '5px'
        }
        let detail = {
            display: 'flex',
            justifyContent: 'space-between'
        }
        let text = {
            fontSize: '0.7em'
        }
        let smallText = {
            fontSize: '0.6em',
            marginLeft: 'auto'
        }
        let utlityText = {
            fontSize: '0.75em',
            textAlign: 'center',
            marginTop: '5px'
        }

        let icon = '';
        let id = '';
        if (this.props.square.text === 'Electric Company') {
            icon = faLightbulb;
            id = 'electric-icon';
        } else if (this.props.square.text === 'Water Works') {
            icon = faTint;
            id = 'water-icon';
        } else {
            icon = faTrain;
            id = 'station-icon';
        }

        return (
            <div style={container}>
                {
                    this.props.square.type.includes("property") && <div style={header} className={`${this.props.square.subtype}-color`}>
                        <p style={{margin: '0', marginBottom: '5px', fontSize: '0.6em', fontWeight: 'bold'}}>Title Deed</p>
                        <p style={{margin: '0', fontSize: '0.9em', fontWeight: 'bold'}}>{this.props.square.text}</p>
                    </div>
                }
                {
                    (this.props.square.subtype.includes("utility") || this.props.square.subtype.includes("station"))  &&  
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon style={{fontSize: '3em', marginTop: '10px'}} icon={icon} id={id} />
                            <p style={{fontSize: '0.9em', fontWeight: 'bold', textAlign: 'center', marginBottom: '0'}}>{this.props.square.text}</p>
                        </div>
                }
                <div style={body}>
                    {
                        (this.props.square.type.includes("property") || this.props.square.subtype.includes("station")) && this.props.square.rent.map((rent, index, array) => 
                            this.props.square.type.includes("property") ?
                                <div key={`${this.props.square.text}_rent${index}`} style={detail}> 
                                    <span style={text}>{index === 0 ? 'Rent' : index === 1 ? 'Rent with colour set' : index === array.length - 1 ? 'Rent with hotel' : `Rent with ${index - 1} house`}</span>
                                    <span style={text}>${rent}</span>
                                </div>
                            : 
                                <div key={`${this.props.square.text}_rent${index}`} style={detail}> 
                                    <span style={text}>{index === 0 ? 'RENT' : `If ${index + 1} railroads are owned`}</span>
                                    <span style={text}>${rent}</span>
                                </div>
                        )
                    }
                    {this.props.square.type.includes("property") && <hr></hr>}
                    {
                        this.props.square.type.includes("property") &&  
                            [<div key={`${this.props.square.text}_houseCost`} style={detail}> 
                                <span style={text}>Houses cost</span>
                                <span style={text}>${this.props.square.houseCost} each</span>
                            </div>,
                            <div key={`${this.props.square.text}_hotelCost`} style={detail}> 
                                <span style={text}>Hotels cost</span>
                                <span style={text}>${this.props.square.houseCost} each</span>
                            </div>,
                            <div key={`${this.props.square.text}_smallText`} style={detail}><span style={smallText}>(plus 4 houses)</span></div>]
                    }
                    {
                        this.props.square.subtype.includes("utility") &&  
                            [<p key={`utility_text1`} style={utlityText}>If one Utility is owned, rent is 4 times amount shown on dice.</p>,
                            <p key={`utility_text2`} style={utlityText}>If both Utilities are owned, rent is 10 times amount shown on dice.</p>]
                    }
                </div>
            </div>
        )
    }
    
}

export default SquareDetailsComponent;

