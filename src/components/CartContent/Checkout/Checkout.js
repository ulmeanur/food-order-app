import React, { useState, useRef, useReducer, useEffect } from 'react';
import classes from './Checkout.module.css';
import Input from '../../UI/Input/Input';

const nameReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
};

const streetReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 3 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 3 };
	}
	return { value: '', isValid: false };
};

const postalReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const cityReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 3 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 3 };
	}
	return { value: '', isValid: false };
};

const Checkout = (props) => {
	const nameInputRef = useRef();
	const emailInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const [formIsValid, setFormIsValid] = useState(false);

	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [streetState, dispatchStreet] = useReducer(streetReducer, {
		value: '',
		isValid: null,
	});

	const [postalState, dispatchPostal] = useReducer(postalReducer, {
		value: '',
		isValid: null,
	});

	const [cityState, dispatchCity] = useReducer(cityReducer, {
		value: '',
		isValid: null,
	});

	const { isValid: nameIsValid } = nameState;
	const { isValid: emailIsValid } = emailState;
	const { isValid: streetIsValid } = streetState;
	const { isValid: postalIsValid } = postalState;
	const { isValid: cityIsValid } = cityState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity!');
			setFormIsValid(
				nameIsValid &&
					emailIsValid &&
					streetIsValid &&
					postalIsValid &&
					cityIsValid
			);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [nameIsValid, emailIsValid, streetIsValid, postalIsValid, cityIsValid]);

	const nameChangeHandler = (event) => {
		dispatchName({ type: 'USER_INPUT', val: event.target.value });
	};

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
	};

	const streetChangeHandler = (event) => {
		dispatchStreet({ type: 'USER_INPUT', val: event.target.value });
	};

	const postalChangeHandler = (event) => {
		dispatchPostal({ type: 'USER_INPUT', val: event.target.value });
	};

	const cityChangeHandler = (event) => {
		dispatchCity({ type: 'USER_INPUT', val: event.target.value });
	};

	const validateNameHandler = () => {
		dispatchName({ type: 'INPUT_BLUR' });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validateStreetHandler = () => {
		dispatchStreet({ type: 'INPUT_BLUR' });
	};

	const validatePostalHandler = () => {
		dispatchPostal({ type: 'INPUT_BLUR' });
	};

	const validateCityHandler = () => {
		dispatchCity({ type: 'INPUT_BLUR' });
	};

	const submitCheckoutHandler = (event) => {
		event.preventDefault();

		if (formIsValid) {
			console.log('Valid - Submit form');
		} else if (!nameState.isValid) {
			nameInputRef.current.focus();
		} else if (!emailState.isValid) {
			emailInputRef.current.focus();
		} else if (!streetState.isValid) {
			streetInputRef.current.focus();
		} else if (!postalState.isValid) {
			postalInputRef.current.focus();
		} else if (!cityState.isValid) {
			cityInputRef.current.focus();
		}
	};

	return (
		<div className={classes.checkout}>
			<h2>Checkout details</h2>
			<form className={classes.form} onSubmit={submitCheckoutHandler}>
				<div className={`${classes.control} ${nameIsValid ? "" : classes.invalid }`}>
					<Input
						ref={nameInputRef}
						label="Name"
						input={{
							id: 'name',
							type: 'text',
							value: nameState.value,
							isValid: `${nameIsValid}`,
							onChange: nameChangeHandler,
							onBlur: validateNameHandler,
						}}
					/>
					{!nameIsValid && <p className={classes.error}>Error! Value entered is invalid!</p>}
				</div>

				<div className={`${classes.control} ${emailIsValid ? "" : classes.invalid }`}>
					<Input
						ref={emailInputRef}
						label="Email"
						input={{
							id: 'email',
							type: 'email',
							value: emailState.value,
							isValid: `${emailIsValid}`,
							onChange: emailChangeHandler,
							onBlur: validateEmailHandler,
						}}
					/>
					{!emailIsValid && <p className={classes.error}>Error! Value entered is invalid!</p>}
				</div>
				

				<div className={`${classes.control} ${streetIsValid ? "" : classes.invalid }`}>
					<Input
						ref={streetInputRef}
						label="Street"
						input={{
							id: 'street',
							type: 'text',
							value: streetState.value,
							isValid: `${streetIsValid}`,
							onChange: streetChangeHandler,
							onBlur: validateStreetHandler,
						}}
					/>
					{!streetIsValid && <p className={classes.error}>Error! Value entered is invalid!</p>}
				</div>
				<div className={`${classes.control} ${postalIsValid ? "" : classes.invalid }`}>
					<Input
						ref={postalInputRef}
						label="Postal Code"
						input={{
							id: 'postal',
							type: 'text',
							isValid: `${postalIsValid}`,
							onChange: postalChangeHandler,
							onBlur: validatePostalHandler,
						}}
					/>
					{!postalIsValid && <p className={classes.error}>Error! Value entered is invalid!</p>}
				</div>
				<div className={`${classes.control} ${cityIsValid ? "" : classes.invalid }`}>
					<Input
						ref={cityInputRef}
						label="City"
						input={{
							id: 'city',
							type: 'text',
							isValid: `${cityIsValid}`,
							onChange: cityChangeHandler,
							onBlur: validateCityHandler,
						}}
					/>
					{!cityIsValid && <p className={classes.error}>Error! Value entered is invalid!</p>}
				</div>
				<div className={classes.actions}>
					<button type="submit" className={classes.submit}>
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
