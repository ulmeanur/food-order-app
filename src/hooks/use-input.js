import React, { useReducer } from 'react';

const useInput = (validateValue) => {
	const initialStateInput = { value: '', isValid: false, isTouched: false };

	const inputReducer = (state, action) => {
		if (action.type === 'USER_INPUT') {
			return {
				value: action.val,
				isValid: validateValue(action.val),
				isTouched: state.isTouched,
			};
		}
		if (action.type === 'INPUT_BLUR') {
			return {
				value: state.value,
				isValid: validateValue(state.value),
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

	const [inputState, dispatchInput] = useReducer(inputReducer, {
		value: '',
		isValid: null,
		isTouched: false,
	});

	const inputChangeHandler = (event) => {
		dispatchInput({ type: 'USER_INPUT', val: event.target.value });
	};

	const inputBlurHandler = () => {
		//validate input on Blur event
		dispatchInput({ type: 'INPUT_BLUR' });
	};

	// TODO: submitedValueHandler should be deleted after using RESET handler
	const submitedValueHandler = () => {
		dispatchInput({ type: 'SUBMIT' });
	};

	const resetInputHandler = () => {
		dispatchInput({ type: 'RESET' });
	};

	const {
		value,
		isValid: enteredValueIsValid,
		isTouched: inputValueIsTouched,
	} = inputState;
	// we are setting the below variable to avoid form validation first time is rendered

	const inputHasError = !enteredValueIsValid && inputValueIsTouched;

	return {
		value,
		hasError: inputHasError,
		inputChangeHandler,
		inputBlurHandler,
		submitedValueHandler,
		resetInputHandler,
	};
};

export default useInput;
