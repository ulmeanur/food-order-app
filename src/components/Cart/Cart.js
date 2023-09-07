import React from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {

	const cartItems = (
		<ul className={classes["cart-item"]}>{[
				{
					id: 'c1',
					name: 'Sushi',
					amount: 2,
					price: 12.99,
				},
                {
					id: 'c2',
					name: 'Pizza',
					amount: 4,
					price: 9.99,
				},
			].map((item) => {
				return (<li>{item.name}</li>);
            })}
		</ul>
	);
	return (
		<Modal onClose={props.onClose}>
			<div className={classes.cart}>{cartItems}</div>
			<div className={classes.total}>
                <span>Total Amont</span>
                <span>35.23</span>
            </div>
			<div className={classes.actions}>
				<form>
					<button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
					<button className={classes.button}>Order</button>
				</form>
			</div>
		</Modal>
	);
};

export default Cart;
