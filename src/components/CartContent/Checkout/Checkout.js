import React, { useState, useRef, useReducer } from 'react';
import classes from './Checkout.module.css';
import Input from '../../UI/Input/Input';
import useInput from '../../../hooks/use-input';

const Checkout = (props) => {

	const {
		value: enteredNameValue,
		hasError: nameHasError,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		submitedValueHandler: submitedNameValueHandler,
		resetInputHandler: resetNameHandler
	} = useInput(value => value.trim().length > 6);
	
	
	const {
		value: enteredEmailValue,
		hasError: emailHasError,
		inputChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		submitedValueHandler: submitedEmailValueHandler,
		resetInputHandler: resetEmailHandler
	} = useInput(value => value.includes('@'));
	
	
	const {
		value: enteredStreetValue,
		hasError: streetHasError,
		inputChangeHandler: streetChangeHandler,
		inputBlurHandler: streetBlurHandler,
		submitedValueHandler: submitedStreetValueHandler,
		resetInputHandler: resetStreetHandler
	} = useInput(value => value.trim().length > 3);
	
	
	const {
		value: enteredPostalValue,
		hasError: postalHasError,
		inputChangeHandler: postalChangeHandler,
		inputBlurHandler: postalBlurHandler,
		submitedValueHandler: submitedPostalValueHandler,
		resetInputHandler: resetPostalHandler
	} = useInput(value => value.trim().length > 5);
	
	
	const {
		value: enteredCityValue,
		hasError: cityHasError,
		inputChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		submitedValueHandler: submitedCityValueHandler,
		resetInputHandler: resetCityHandler
	} = useInput(value => value.trim().length > 3);
	

	const nameInputRef = useRef();
	const emailInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	let isFormValid = false;

	if (
		!nameHasError &&
		!emailHasError &&
		!streetHasError &&
		!postalHasError &&
		!cityHasError
	) {
		isFormValid = true;
	}

	const submitCheckoutHandler = (event) => {
		event.preventDefault();

		if (isFormValid) {
			console.log('Valid - Submit form');
		} else if (nameHasError) {
			nameInputRef.current.focus();
		} else if (emailHasError) {
			emailInputRef.current.focus();
		} else if (streetHasError) {
			streetInputRef.current.focus();
		} else if (postalHasError) {
			postalInputRef.current.focus();
		} else if (cityHasError) {
			cityInputRef.current.focus();
		}

		//after sending data to server we should Reset the values (dispach the RESET instead of SUBMIT)
		// until then we will display the data on inputs

		submitedNameValueHandler();
		submitedEmailValueHandler();
		submitedStreetValueHandler();
		submitedPostalValueHandler();
		submitedCityValueHandler();

		// resetNameHandler();
		// resetEmailHandler();
		// resetStreetHandler();
		// resetPostalHandler();
		// resetCityHandler();
	};

	return (
		<div className={classes.checkout}>
			<h2>Checkout details</h2>
			<form className={classes.form} onSubmit={submitCheckoutHandler}>
				<div className={classes.control}>
					<Input
						ref={nameInputRef}
						label="Name"
						input={{
							id: 'name',
							type: 'text',
							value: enteredNameValue,
							onChange: nameChangeHandler,
							onBlur: nameBlurHandler,
						}}
						showError={nameHasError}
						errorMessage="Error! Name is not valid!"
					/>
				</div>

				<div className={classes.control}>
					<Input
						ref={emailInputRef}
						label="Email"
						input={{
							id: 'email',
							type: 'email',
							value: enteredEmailValue,
							onChange: emailChangeHandler,
							onBlur: emailBlurHandler,
						}}
						showError={emailHasError}
						errorMessage="Error! Email is not valid!"
					/>
				</div>

				<div className={classes.control}>
					<Input
						ref={streetInputRef}
						label="Street"
						input={{
							id: 'street',
							type: 'text',
							value: enteredStreetValue,
							onChange: streetChangeHandler,
							onBlur: streetBlurHandler,
						}}
						showError={streetHasError}
						errorMessage="Error! Street is not valid!"
					/>
				</div>
				<div className={classes.control}>
					<Input
						ref={postalInputRef}
						label="Postal Code"
						input={{
							id: 'postal',
							type: 'text',
							value: enteredPostalValue,
							onChange: postalChangeHandler,
							onBlur: postalBlurHandler,
						}}
						showError={postalHasError}
						errorMessage="Error! Postal Code is not valid!"
					/>
				</div>
				<div className={classes.control}>
					<Input
						ref={cityInputRef}
						label="City"
						input={{
							id: 'city',
							type: 'text',
							value: enteredCityValue,
							onChange: cityChangeHandler,
							onBlur: cityBlurHandler,
						}}
						showError={cityHasError}
						errorMessage="Error! City is not valid!"
					/>
				</div>
				<div className={classes.actions}>
					<button
						type="submit"
						disabled={!isFormValid}
						className={classes.submit}
					>
						Confirm
					</button>
					<button type="button" onClick={props.onCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default Checkout;
