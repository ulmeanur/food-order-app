import React, { useState, useRef, useReducer } from 'react';
import classes from './Checkout.module.css';
import Input from '../../UI/Input/Input';
import useInput from '../../../hooks/use-input';

/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */

const createValidationRule = (ruleName, errorMessage, validateFunc) => {
	return {
		name: ruleName,
		message: errorMessage,
		validate: validateFunc,
	};
};

const requiredRule = (inputName) => {
	return createValidationRule(
		'required', // rule name
		`${inputName} required`, // error message
		(inputValue) => inputValue.trim().length !== 0 // validation function
	);
};

const minLengthRule = (inputName, minCharacters) => {
	return createValidationRule(
		'minLength',
		`${inputName} should contain atleast ${minCharacters} characters`,
		(inputValue) => inputValue.length >= minCharacters
	);
};

const maxLengthRule = (inputName, maxCharacters) => {
	return createValidationRule(
		'maxLength',
		`${inputName} cannot contain more than ${maxCharacters} characters`,
		(inputValue) => inputValue.length <= maxCharacters
	);
};

const emailRequiredRule = (inputName) => {
	return createValidationRule(
		'emailRequired', // rule name
		`${inputName} should contain @ symbol`, // error message
		(inputValue) => inputValue.includes('@') // validation function
	);
};

// const passwordMatchRule = () => {
// 	return createValidationRule(
// 		'passwordMatch',
// 		`passwords do not match`,
// 		(inputValue, formObj) => inputValue === formObj.password.value
// 	);
// };

const Checkout = (props) => {

	const nameValidationRules = [
		requiredRule('name'),
		minLengthRule('name', 3),
		maxLengthRule('name', 25),
	];
	const {
		value: enteredNameValue,
		hasError: nameHasError,
		error: nameErrorMessage,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		submitedValueHandler: submitedNameValueHandler,
		resetInputHandler: resetNameHandler,
	} = useInput(nameValidationRules);

	const emailValidationRules = [
		emailRequiredRule('email'),
		minLengthRule('email', 10),
		maxLengthRule('email', 25),
	];

	const {
		value: enteredEmailValue,
		hasError: emailHasError,
		error: emailErrorMessage,
		inputChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		submitedValueHandler: submitedEmailValueHandler,
		resetInputHandler: resetEmailHandler,
	} = useInput(emailValidationRules);

	const streetValidationRules = [
		requiredRule('street'),
		minLengthRule('street', 3),
		maxLengthRule('street', 25),
	];
	const {
		value: enteredStreetValue,
		hasError: streetHasError,
		error: streetErrorMessage,
		inputChangeHandler: streetChangeHandler,
		inputBlurHandler: streetBlurHandler,
		submitedValueHandler: submitedStreetValueHandler,
		resetInputHandler: resetStreetHandler,
	} = useInput(streetValidationRules);

	const postalValidationRules = [
		requiredRule('postal code'),
		minLengthRule('postal code', 5),
		maxLengthRule('postal code', 6),
	];
	const {
		value: enteredPostalValue,
		hasError: postalHasError,
		error: postalErrorMessage,
		inputChangeHandler: postalChangeHandler,
		inputBlurHandler: postalBlurHandler,
		submitedValueHandler: submitedPostalValueHandler,
		resetInputHandler: resetPostalHandler,
	} = useInput(postalValidationRules);

	const cityValidationRules = [
		requiredRule('city'),
		minLengthRule('city', 3),
		maxLengthRule('city', 25),
	];
	const {
		value: enteredCityValue,
		hasError: cityHasError,
		error: cityErrorMessage,
		inputChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		submitedValueHandler: submitedCityValueHandler,
		resetInputHandler: resetCityHandler,
	} = useInput(cityValidationRules);

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
						errorMessage={nameErrorMessage}
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
						errorMessage={emailErrorMessage}
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
						errorMessage={streetErrorMessage}
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
						errorMessage={postalErrorMessage}
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
						errorMessage={cityErrorMessage}
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
