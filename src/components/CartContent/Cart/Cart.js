import React, { useContext } from 'react';
import Modal from '../../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartItem from '../CartItem/CartItem';
import CartContext from '../../../store/cart-context';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		// bind() is used to ensure that id is passed to the cartItemRemoveHandler function 

		// bind pre-configure as a function for future execution 
		// and basically allows to pre-configure the argument
		// that function will receive when it's being executed.

		cartCtx.removeItem(id);
	}

	const cartItemAddHandler = (item) => {
		// bind() is used to ensure that item is passed to the cartItemAddHandler function 
		cartCtx.addItem({...item, amount: 1});
		console.log("cartCtx=", cartCtx);
	}

	const cartItems = (
		<ul className={classes['cart-item']}>
			{cartCtx.items.map((item) => {
				return (
					<CartItem
						key={item.id}
						id={item.id}
						name={item.name}
						price={item.price}
						amount={item.amount}
						onRemove={cartItemRemoveHandler.bind(null, item.id)}
						onAdd={cartItemAddHandler.bind(null, item)}
					></CartItem>
				);
			})}
		</ul>
	);
	return (
		<Modal onClose={props.onClose}>
			<div className={classes.cart}>{cartItems}</div>
			<div className={classes.total}>
				<span>Total Amont</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<form>
					<button className={classes['button--alt']} onClick={props.onClose}>
						Close
					</button>
					{hasItems && <button className={classes.button}>Order</button>}
				</form>
			</div>
		</Modal>
	);
};

export default Cart;
