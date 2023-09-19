import React, { useRef, useState } from 'react';
import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		//as the ref value will always be a string we need to converted to number
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < -1 ||
			enteredAmountNumber > 10
		) {
			console.log('No items added');
			setAmountIsValid(false);
			return;
		}
		console.log("enteredAmountNumber=", enteredAmountNumber);
		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '10',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button type="submit">+ Add</button>
			{!amountIsValid && <p>Error! Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
