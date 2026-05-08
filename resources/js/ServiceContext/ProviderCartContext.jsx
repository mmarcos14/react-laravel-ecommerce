import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const ProviderCartContext = ({ children }) => {

    const [cart, setCart] = useState({
        product: []
    });

    // LOAD CART
    useEffect(() => {
        const getCart = localStorage.getItem("cart");

        if (getCart) {
            const parsed = JSON.parse(getCart);

            setCart({
                product: parsed.product || []
            });
        }
    }, []);

    // SAVE CART
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ADD TO CART
    const AddToCart = (product) => {

        const verify = (cart?.product || []).some(
            (item) => item.product_id === product.id
        );

        if (verify) {
            alert("This product is already in cart");
            return;
        }

        setCart((prev) => ({
            ...prev,
            product: [
                ...(prev.product || []),
                {
                    product_id: product.id,
                    product_name: product.name,
                    product_price: product.price,
                    product_image: product.images?.[0]?.name || product.photo,
                    qt: 1
                }
            ]
        }));

        alert("Added successfully");
    };

    return (
        <CartContext.Provider value={{ cart, AddToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);