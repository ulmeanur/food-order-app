import classes from './Checkout.module.css';

const Checkout = (props) => {
	const confirmHandler = (event) => {
		event.preventdefault();
	};

	const checkoutHandler = (event) => {
		event.preventDefault();
	};

	return (
		<div className={classes.checkout}>
			<h2>Checkout details</h2>
			<form onSubmit={confirmHandler}>
				<div className={classes.control}>
					<label htmlFor="">Name</label>
					<input id="name" type="text" />
				</div>
				<div className={classes.control}>
					<label htmlFor="">Street</label>
					<input id="street" type="text" />
				</div>
				<div className={classes.control}>
					<label htmlFor="">Postal Code</label>
					<input id="postal" type="text" />
				</div>
				<div className={classes.control}>
					<label htmlFor="">City</label>
					<input id="postal" type="text" />
				</div>
				<div className={classes.actions}>
					<button className={classes.submit} onClick={checkoutHandler}>Confirm</button>
					<button type="button" onClick={props.onCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default Checkout;
