import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler'

const INGEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount () { 
        axios.get('ingredients.json').then(response => {
            this.setState({ingredients: response.data})
        }).catch(error=>this.setState({error: true}));
    }

    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = ()=>{
        this.setState({loading: true});
        axios.post('/orders.json',{
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kristof',
                address: {
                    street: 'TestStreet',
                    zipCode: '123456',
                    country: 'Hungary'
                },
                email: 'test@test.hu'
            },
            deliveryMethod: 'fastest'
        }).then(res=> this.setState({loading: false,
                                    purchasing: false}))
        .catch(err => this.setState({loading: false,
                                    purchasing: false}));
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            }).reduce((sum,el)=> sum + el ,0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updated = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updated;
        const priceAddition = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updated = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updated;
        const priceAddition = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        if(this.state.ingredients){
            orderSummary = 
            <OrderSummary ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>
            if(this.state.loading){
                orderSummary = <Spinner />
            }
        }
        
         let burger = this.state.error ? 
                <p>Ingredients can't be loaded</p> : <Spinner/>
         if(this.state.ingredients){
            burger = <React.Fragment>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls ingredientAdded={this.addIngredientHandler}
                                    ingredientRemoved={this.removeIngredientHandler}
                                    disabled={disabledInfo}
                                    ordered={this.purchaseHandler}
                                    purchasable={this.state.purchasable}
                                    price={this.state.totalPrice}/>
                    </React.Fragment>
         }        
            
        return ( 
            <React.Fragment>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);