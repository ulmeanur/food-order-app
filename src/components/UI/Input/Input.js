import React, {Fragment, useRef} from 'react';
import classes from './Input.module.css';


const Input = React.forwardRef((props, ref) => {

	return (
		<Fragment>
		<div className={`${classes.input} ${props.hasError?classes.invalid:""}`}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
		{props.hasError && (props.errorMessage.trim() !== "") && <p className={classes["input-error"]}>{props.errorMessage}</p>}
		</Fragment>
		
	);
});

export default Input;
