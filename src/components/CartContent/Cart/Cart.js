import React, { Fragment, useContext, useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartItem from '../CartItem/CartItem';
import CartContext from '../../../store/cart-context';
import Checkout from '../Checkout/Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);
	const [httpError, setHttpError] = useState();

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		// bind() is used to ensure that id is passed to the cartItemRemoveHandler function

		// bind pre-configure as a function for future execution
		// and basically allows to pre-configure the argument
		// that function will receive when it's being executed.

		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		// bind() is used to ensure that item is passed to the cartItemAddHandler function
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const submitOrderHandler = async (userData) => {
		try {
			// if form is valid send data to the server
			setIsSubmitting(true);
			const response = await fetch(
				'https://foodorder-01-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user: userData,
						orderItems: cartCtx.items,
					}),
				}
			);

			if (!response.ok) {
				console.log('we have a submition error that we need to handle it');
				throw new Error('Something went wrong');
			}

			setIsSubmitting(false);
			setDidSubmit(true);
			cartCtx.clearCart();

		} catch (error) {
			setIsSubmitting(false);
			setDidSubmit(false);
			setHttpError(error.message);
		}
	};

	const closeModalBtn = (
		<div className={classes.actions}>
			<form>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</form>
		</div>
	);

	const sendingOrderContent = (
		<section className={classes['order-submitting']}>
			<p>Items are send to server ...</p>
		</section>
	);

	const failedOrderContent = (
		<section className={classes['order-failed']}>
			<p>Something went wrong! Please try again later.</p>
			<p className={classes['error-type']}>Error message: {httpError}</p>
			{closeModalBtn}
		</section>
	);

	const successOrderContent = (
		<section className={classes['order-sent']}>
			<p>Success! Order was placed and is on your way.</p>
			{closeModalBtn}
		</section>
	);
	// if (isSubmitting) {
	// 	return sendingOrderContent;
	// }

	// if (httpError) {
	// 	return failedOrderContent;
	// }

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

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const checkoutDetails = (
		<div className={classes.actions}>
			<form>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasItems && (
					<button className={classes.button} onClick={orderHandler}>
						Order
					</button>
				)}
			</form>
		</div>
	);

	const cartModalContent = (
		<Fragment>
			<div className={classes.cart}>{cartItems}</div>
			<div className={classes.total}>
				<span>Total Amont</span>
				<span>{totalAmount}</span>
			</div>

			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckout && checkoutDetails}
		</Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && !httpError && cartModalContent}
			{isSubmitting && sendingOrderContent}
			{!isSubmitting && didSubmit && successOrderContent}
			{!didSubmit && httpError && failedOrderContent}
		</Modal>
	);
};

export default Cart;
