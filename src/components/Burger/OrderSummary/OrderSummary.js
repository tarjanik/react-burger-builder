import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key=> 
        <li key={key}>
            <span style={{textTransform: 'capitalize'}}>
                {key}
            </span>: {props.ingredients[key]}
        </li>);
    return (
        <React.Fragment>
           <h3>Your order</h3>
           <p>Delicious burger with you selected ingredients:</p>
           <ul>{ingredientSummary}</ul> 
           <p>TOTAL: {props.price.toFixed(2)}$</p>
           <p>Continue to checkout?</p>
           <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
           <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default orderSummary;