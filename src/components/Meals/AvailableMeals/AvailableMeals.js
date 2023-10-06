import React, { useEffect, useState} from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from '../MealItem/MealItem';
import Card from '../../UI/Card/Card';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);

	useEffect(() => {
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

			const responseData = await response.json();

			const loadedMeals = [];

			console.log("responseData =", responseData);

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
		};
		
		fetchMeals();
	}, []);

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
