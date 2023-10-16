import React, {Fragment, useRef} from 'react';
import classes from './Input.module.css';


const Input = React.forwardRef((props, ref) => {

	return (
		<Fragment>
		<div className={`${classes.input} ${props.showError?classes.invalid:""}`}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
		{props.showError && (props.errorMessage.trim() !== "") && <p className={classes["input-error"]}>{props.errorMessage}</p>}
		</Fragment>
		
	);
});

export default Input;
