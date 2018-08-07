import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
 
    componentWillUpdate() {
        console.log('Updated')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key=> 
        <li key={key}>
            <span style={{textTransform: 'capitalize'}}>
                {key}
            </span>: {this.props.ingredients[key]}
        </li>);
        return (<React.Fragment>
            <h3>Your order</h3>
            <p>Delicious burger with you selected ingredients:</p>
            <ul>{ingredientSummary}</ul> 
            <p>TOTAL: {this.props.price.toFixed(2)}$</p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
         </React.Fragment>)
    }
}    

export default OrderSummary;