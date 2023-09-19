import React, { useReducer } from 'react';

import CartContext from './cart-context';
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

//the Cart State
const cartReducer = (state, action) => {
	// state is a state object and the last state snapshop managed by the Reducer
	// action is the action (a number or a text or an object) the will triggered by the Reducer's dispatche function
 
	// cartReducer func is created outside the component
	// as it doesn't need anything from the component
	// and it shoudn't need to be recreated everytime when the component is re-evaluated

    if( action.type === "ADD") {
		console.log(" ADD item", action.item);
        // concat() generates a brand new array instead of push() that adds a new item
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

		//return a new state snapshop
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if( action.type === "REMOVE") {
        
    }

	return defaultCartState;
};

const CartProvider = (props) => {
	// useReducer is used to manage Cart state as it is more complex

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		console.log("dispatchCartAction --> ADD");
        dispatchCartAction({type: "ADD", item: item});
    };

	const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: "REMOVE", id: id});
    };

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
