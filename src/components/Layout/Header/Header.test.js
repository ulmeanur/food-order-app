import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
	test('renders Header Title', () => {
		// Arrange
		render(<Header />);

		// Act
		// ... nothing

		// Assert
		const headerTitleElement = screen.getByText(/ReactMeals/, {exact: true});
		expect(headerTitleElement).toBeInTheDocument();
	});

    test('renders Header background image', () => {
		// Arrange
		render(<Header />);

		// Act
		// ... nothing

		// Assert
		// const headerImgElement = screen.getByRole('img', { alt: "A table full of delicious food!" });
		const headerImgElement = screen.getByRole('img', {  name: /a table full of delicious food!/i});
		expect(headerImgElement).toBeInTheDocument();
	});

});
