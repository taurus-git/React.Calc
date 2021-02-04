import React, {Component} from 'react';
import ReactDON from 'react-dom';
import './SingleButton.css';

class SingleButton extends Component {

    getButtonValue = (value, id, type) => {
        this.props.updateDisplayValue(value, id, type)
    }

    render() {
        const {id, value, buttonClass} = this.props.buttonValue;

        let defaultButtonClass = "button-item ";

        if (buttonClass) {
            defaultButtonClass = defaultButtonClass + buttonClass;
        }

        return (
            <button
                className={defaultButtonClass}
                onClick={() => this.getButtonValue(value, id)}
            >
                {value}
            </button>
        );
    }
};

export default SingleButton;