import React from 'react';
import ReactDOM from 'react-dom';
import './Buttons.css';
import SingleButton from '../SingleButton';


const Buttons = ({buttonsData, updateDisplayValue}) => {

    let buttons = buttonsData.map((buttonValue) => {

            return (
                <SingleButton
                    key={buttonValue.id}
                    buttonValue={buttonValue}
                    updateDisplayValue={updateDisplayValue}
                />
            );
        }
    );

    return (
        <div className="buttons-wrapper">{buttons}</div>
    )
}

export default Buttons;
