import React, { useReducer } from 'react';

const useInput = (validationRules) => {

	const isInputFieldValid = (inputFieldValue, validationRules) => {
		for (const rule of validationRules) {
		  if (!rule.validate(inputFieldValue)) {
			return {
				isValid: false,
				errorMessage: rule.message
			  };
		  }
		}
  
		return {
			isValid: true,
			errorMessage: ""
		  };
	  };

	const initialStateInput = { value: '', isValid: false, isTouched: false };

	const inputReducer = (state, action) => {

		let isValidInput;;

		if (action.type === 'USER_INPUT') {
			isValidInput = isInputFieldValid(action.val, validationRules);
			return {
				value: action.val,
				isValid: isValidInput.isValid,
				isTouched: state.isTouched,
				error: isValidInput.errorMessage
			};
		}
		if (action.type === 'INPUT_BLUR') {
			isValidInput = isInputFieldValid(state.value, validationRules);
			return {
				value: state.value,
				isValid: isValidInput.isValid,
				isTouched: true,
				error: isValidInput.errorMessage
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
		error: ''
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
		error
	} = inputState;
	// we are setting the below variable to avoid form validation first time is rendered

	const inputHasError = !enteredValueIsValid && inputValueIsTouched;

	return {
		value,
		hasError: inputHasError,
		error,
		inputChangeHandler,
		inputBlurHandler,
		submitedValueHandler,
		resetInputHandler,
	};
};

export default useInput;
