import React, { Fragment } from 'react';
//import classes from "./Meals.module.css";
import MealsSummary from '../MealsSummery/MealsSummery';
import AvailableMeals from '../AvailableMeals/AvailableMeals';

const Meals = () => {
	return (
		<Fragment>
			<MealsSummary />
            <AvailableMeals />
		</Fragment>
	);
};

export default Meals;
