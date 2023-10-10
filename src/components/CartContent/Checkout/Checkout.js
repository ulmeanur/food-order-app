import classes from './Checkout.module.css';

const Checkout = (props) => {
    const submitHandler = (event) => {
        event.preventdefault();

    };

    const checkoutHandler = (event) => {
        event.preventDefault();

    };


	return <div className={classes.checkout}>
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor=''>Name</label>
                <input id='name' type='text'/>
            </div>
            <div className={classes.control}>
                <label htmlFor=''>Street</label>
                <input id='street' type='text'/>
            </div>
            <div className={classes.control}>
                <label htmlFor=''>Postal Code</label>
                <input id='postal' type='text'/>
            </div>
            <div className={classes.control}>
                <label htmlFor=''>City</label>
                <input id='postal' type='text'/>
            </div>

            <button onClick={checkoutHandler}>Confirm</button>
            <button type='button' onClick={props.onCancel}>Cancel</button>
        </form>
    </div>;
};

export default Checkout;
