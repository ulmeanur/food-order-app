import React, { useReducer } from 'react';

import CartContext from './cart-context';
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

//the Cart State
const cartReducer = (state, action) => {

	/**
	@param {object} state -  is a state object and has the last state snapshop managed by the Reducer
	@param {string} action -  is the action (a number or a text or an object) that will be triggered by the Reducer's dispatche function
 
	cartReducer func is created outside the component
	as it doesn't need anything from the component
	it shoudn't need to be recreated everytime when the component is re-evaluated
	*/

    if( action.type === "ADD") {

		const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
		const existingCartItemsIndex = state.items.findIndex(item => item.id === action.item.id);
		const existingCartItem = state.items[existingCartItemsIndex];
        // concat() generates a brand new array instead of push() that adds a new item
        
		
		let updatedItems;

		if (existingCartItem) {

			//existingCartItem.amount = existingCartItem.amount + action.item.amount;
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount
			};

			updatedItems = [...state.items];
			updatedItems[existingCartItemsIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		//return a new state snapshop
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if( action.type === "REMOVE") {

		const existingCartItemsIndex = state.items.findIndex(item => item.id === action.id);
		
		const existingItem = state.items[existingCartItemsIndex];

		const updatedTotalAmount = state.totalAmount - existingItem.price;

		let updatedItems;

		if(existingItem.amount === 1) {
			//filter() generates a new array 
			//here the new array contains all item that aren't equal to action.id
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = {...existingItem, amount: existingItem.amount-1};
			updatedItems = [...state.items];
			updatedItems[existingCartItemsIndex] = updatedItem;

		}

		//return a new state snapshop
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
	}

	if( action.type === "CLEAR") {
		return defaultCartState;
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	// useReducer is used to manage Cart state as it is more complex

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
        dispatchCartAction({type: "ADD", item: item});
    };

	const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: "REMOVE", id: id});
    };

	const clearCartFromCartHandler = () => {
        dispatchCartAction({type: "CLEAR"});
    };

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
