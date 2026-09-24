// React Core
import {
    createContext,
    useEffect,
    useState
} from "react";

// Create the cart context
export const CartContext = createContext();

// Create the cart context provider
const CartContextProvider = ({ children }) => {

    // Load the saved cart when the application starts
    const [cartItems, setCartItems] = useState(() => {

        // Get the saved cart from localStorage
        const savedCartItems = localStorage.getItem("cartItems");

        // Check if a saved cart exists
        if (savedCartItems) {

            // Convert the saved string back into a JavaScript array
            return JSON.parse(savedCartItems);
        }

        // Start with an empty cart if no saved cart exists
        return [];
    });

    // Save the cart to localStorage whenever cartItems changes
    useEffect(() => {

        // Convert the cart array into a string and save it
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);

    // Provide the cart data to all child components
    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Export the cart context provider
export default CartContextProvider;