import { render, screen } from '@testing-library/react';
import Meals from './Meals';

describe('Meals component', () => {

    test('renders Meals ', () => {
		// Arrange
		render(<Meals />);

		// Act
		// ... nothing

		// Assert
		// const headerImgElement = screen.getByRole('img', { hidden: false });
		// expect(headerImgElement).toBeInTheDocument();

		const outputElement = screen.queryByText('Delicious Food', { exact: false });
		expect(outputElement).not.toBeNull();

		const mealsDescrotionText = screen.getByText(/Delicious Food/, {exact: false});
		expect(mealsDescrotionText).toBeInTheDocument();
	});

});
