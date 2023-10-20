import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from '../MealItem/MealItem';
import Card from '../../UI/Card/Card';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		//fetching the data will start once the component started to load
		// but when the fetching is done the component isn't updated (async), so it has no data
		// in order to populate the component with the fetched data we need to use STATE to update the component

		// useEffect has no dependencies as we want to load data only at start

		const fetchMeals = async () => {
			// we need to create a function inside useEffect if we want to use async fetch
			//because inside useEfeect we shoud not use functions that returns a promise
			//(fetch is returning a promise )

			const response = await fetch(
				'https://foodorder-01-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};
		// as fetchMeals() is a promise we can add then() and catch() on it
		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});

	}, []);

	if (isLoading) {
		return (
			<section className={classes['meals-loading']}>
				<p>Loading ...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes['meals-error']}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
