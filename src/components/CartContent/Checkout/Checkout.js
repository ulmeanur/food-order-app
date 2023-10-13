import React, { useState, useRef, useReducer, useEffect } from 'react';
import classes from './Checkout.module.css';
import Input from '../../UI/Input/Input';

const initialStateInput = { value: '', isValid: false, isTouched: false };

const nameReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
			isTouched: state.isTouched,
		};
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.trim().length > 6,
			isTouched: true,
		};
	}

	if (action.type === 'RESET') {
		return initialStateInput;
	}
	if (action.type === 'SUBMIT') {
		return {
			value: state.value,
			isValid: state.isValid,
			isTouched: true,
		};
	}

	return initialStateInput;
};

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.includes('@'),
			isTouched: state.isTouched,
		};
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.includes('@'),
			isTouched: true,
		};
	}
	if (action.type === 'RESET') {
		return initialStateInput;
	}
	if (action.type === 'SUBMIT') {
		return {
			value: state.value,
			isValid: state.isValid,
			isTouched: true,
		};
	}

	return initialStateInput;
};

const streetReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 3,
			isTouched: state.isTouched,
		};
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.trim().length > 3,
			isTouched: true,
		};
	}
	if (action.type === 'RESET') {
		return initialStateInput;
	}
		if (action.type === 'SUBMIT') {
		return {
			value: state.value,
			isValid: state.isValid,
			isTouched: true,
		};
	}

	return initialStateInput;
};

const postalReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
			isTouched: state.isTouched,
		};
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.trim().length > 6,
			isTouched: true,
		};
	}
	if (action.type === 'RESET') {
		return initialStateInput;
	}
	if (action.type === 'SUBMIT') {
		return {
			value: state.value,
			isValid: state.isValid,
			isTouched: true,
		};
	}

	return initialStateInput;
};

const cityReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 3,
			isTouched: state.isTouched,
		};
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.trim().length > 3,
			isTouched: true,
		};
	}
	if (action.type === 'RESET') {
		return initialStateInput;
	}
	if (action.type === 'SUBMIT') {
		return {
			value: state.value,
			isValid: state.isValid,
			isTouched: true,
		};
	}

	return initialStateInput;
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
		isTouched: false,
	});

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
		isTouched: false,
	});

	const [streetState, dispatchStreet] = useReducer(streetReducer, {
		value: '',
		isValid: null,
		isTouched: false,
	});

	const [postalState, dispatchPostal] = useReducer(postalReducer, {
		value: '',
		isValid: null,
		isTouched: false,
	});

	const [cityState, dispatchCity] = useReducer(cityReducer, {
		value: '',
		isValid: null,
		isTouched: false,
	});

	const { isValid: enterednameIsInvalid, isTouched: nameIsTouched } = nameState;
	const { isValid: enteredemailIsInvalid, isTouched: emailIsTouched } =
		emailState;
	const { isValid: enteredstreetIsInvalid, isTouched: streetIsTouched } =
		streetState;
	const { isValid: enteredpostalIsInvalid, isTouched: postalIsTouched } =
		postalState;
	const { isValid: enteredcityIsInvalid, isTouched: cityIsTouched } = cityState;

	const nameIsInvalid = !enterednameIsInvalid && nameIsTouched;
	const emailIsInvalid = !enteredemailIsInvalid && emailIsTouched;
	const streetIsInvalid = !enteredstreetIsInvalid && streetIsTouched;
	const postalIsInvalid = !enteredpostalIsInvalid && postalIsTouched;
	const cityIsInvalid = !enteredcityIsInvalid && cityIsTouched;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity!');

			setFormIsValid(
				nameIsInvalid &&
					emailIsInvalid &&
					streetIsInvalid &&
					postalIsInvalid &&
					cityIsInvalid
			);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [
		enterednameIsInvalid,
		enteredemailIsInvalid,
		enteredstreetIsInvalid,
		enteredpostalIsInvalid,
		enteredcityIsInvalid,
		nameIsTouched,
		emailIsTouched,
		streetIsTouched,
		postalIsTouched,
		cityIsTouched,
	]);

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
		} else if (nameIsInvalid) {
			nameInputRef.current.focus();
		} else if (emailIsInvalid) {
			emailInputRef.current.focus();
		} else if (streetIsInvalid) {
			streetInputRef.current.focus();
		} else if (postalIsInvalid) {
			postalInputRef.current.focus();
		} else if (cityIsInvalid) {
			cityInputRef.current.focus();
		}

		dispatchName({ type: 'SUBMIT' });
		dispatchEmail({ type: 'SUBMIT' });
		dispatchStreet({ type: 'SUBMIT' });
		dispatchPostal({ type: 'SUBMIT' });
		dispatchCity({ type: 'SUBMIT' });
	};

	return (
		<div className={classes.checkout}>
			<h2>Checkout details</h2>
			<form className={classes.form} onSubmit={submitCheckoutHandler}>
				<div
					className={`${classes.control} ${
						nameIsInvalid ? classes.invalid : ''
					}`}
				>
					<Input
						ref={nameInputRef}
						label="Name"
						input={{
							id: 'name',
							type: 'text',
							value: nameState.value,
							isValid: `${enterednameIsInvalid}`,
							onChange: nameChangeHandler,
							onBlur: validateNameHandler,
						}}
					/>
					{nameIsInvalid && (
						<p className={classes.error}>Error! Value entered is invalid!</p>
					)}
				</div>

				<div
					className={`${classes.control} ${
						emailIsInvalid ? classes.invalid : ''
					}`}
				>
					<Input
						ref={emailInputRef}
						label="Email"
						input={{
							id: 'email',
							type: 'email',
							value: emailState.value,
							isValid: `${enteredemailIsInvalid}`,
							onChange: emailChangeHandler,
							onBlur: validateEmailHandler,
						}}
					/>
					{emailIsInvalid && (
						<p className={classes.error}>Error! Value entered is invalid!</p>
					)}
				</div>

				<div
					className={`${classes.control} ${
						streetIsInvalid ? classes.invalid : ''
					}`}
				>
					<Input
						ref={streetInputRef}
						label="Street"
						input={{
							id: 'street',
							type: 'text',
							value: streetState.value,
							isValid: `${enteredstreetIsInvalid}`,
							onChange: streetChangeHandler,
							onBlur: validateStreetHandler,
						}}
					/>
					{streetIsInvalid && (
						<p className={classes.error}>Error! Value entered is invalid!</p>
					)}
				</div>
				<div
					className={`${classes.control} ${
						postalIsInvalid ? classes.invalid : ''
					}`}
				>
					<Input
						ref={postalInputRef}
						label="Postal Code"
						input={{
							id: 'postal',
							type: 'text',
							isValid: `${enteredpostalIsInvalid}`,
							onChange: postalChangeHandler,
							onBlur: validatePostalHandler,
						}}
					/>
					{postalIsInvalid && (
						<p className={classes.error}>Error! Value entered is invalid!</p>
					)}
				</div>
				<div
					className={`${classes.control} ${
						cityIsInvalid ? classes.invalid : ''
					}`}
				>
					<Input
						ref={cityInputRef}
						label="City"
						input={{
							id: 'city',
							type: 'text',
							isValid: `${enteredcityIsInvalid}`,
							onChange: cityChangeHandler,
							onBlur: validateCityHandler,
						}}
					/>
					{cityIsInvalid && (
						<p className={classes.error}>Error! Value entered is invalid!</p>
					)}
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
