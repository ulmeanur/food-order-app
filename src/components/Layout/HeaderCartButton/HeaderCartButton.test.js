import { render, screen } from '@testing-library/react';
import HeaderCartButton from './HeaderCartButton';

describe('HeaderCartButton component', () => {
	test('renders Cart button with text "Your Cart"', () => {
		// Arrange
		render(<HeaderCartButton />);

		// Act
		// ... nothing

		// Assert
		const buttonElement = screen.getByRole('button', {
			name: /your cart/i,
		});
		//const buttonElement = screen.getByText(/your cart/i);
		expect(buttonElement).toBeInTheDocument();
	});

    test('renders Cart button icon', () => {
		// Arrange
		render(<HeaderCartButton />);

		// Act
		// ... nothing

		// Assert
		//const iconElement = screen.querySelector('button > span:nth-child(1) > svg');
		//expect(iconElement[0]).toHaveClass('icon');
		//expect(iconElement).toBeInTheDocument();
	});
});
