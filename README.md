
I developed a food order application using React, driven by a desire to enhance my skills and deepen my understanding of front-end development. Leveraging React's capabilities, I focused on creating a seamless user experience with efficient code organization and reusable components.

* Input Validation Rules: The application supports various validation rules for form inputs, including requirements like being required, having a minimum length, maximum length, and specific format (such as email).

* Custom Input Validation Hook: A custom hook named useInput is developed to manage input state and validation. It accepts validation rules as arguments and provides handlers for input changes, blur events, form submissions, and resetting input values.

* Form Input Management: The Checkout component utilizes the useInput hook to manage input validation and state for a checkout form. Each input field (name, email, address, postal code, and city) has its own validation rules and state.

* Form Submission Handling: The Checkout component handles form submission, preventing default behavior, validating the form data, and calling a callback (onConfirm) with the form data if it's valid. It also resets form values after successful submission.

* Error Handling and Display: Error messages are displayed for each input field when validation fails. Refs are used to focus on the respective input field when there's an error.

* Form Cancelation: The Checkout component provides a way to cancel the form, presumably by invoking a provided callback (onCancel).

* Form Validity Checking: The component ensures that the submit button is enabled only when the entire form is valid based on the validity of individual input fields.

* Form Structure: The checkout form includes input fields for name, email, address, postal code, and city, with appropriate labels and error message displays.


Requirements covered:

1. **Main Page**
   - Display a list of available food items.
   - Each food item should display its name, description, price, and an option to add it to the cart.

2. **Cart Modal**
   - Show the selected items in the cart.
   - Display the quantity and total price for each item.
   - Provide options to increase or decrease the quantity of each item in the cart.
   - Include buttons to remove items from the cart or clear the entire cart.

3. **Buttons Behavior from Cart Modal**
   - When there are items in the cart, the cart button should display the total number of items and the total price.
   - Clicking on the cart button should open the cart modal.

4. **Fetching Data, Submitting Orders, Adding an Order, Checkout**
   - Fetch data from an external source to populate the list of available food items.
   - Allow users to select multiple food items and add them to the cart.
   - Provide a checkout functionality for users to submit their orders.
   - Display a confirmation message after successfully placing an order.
