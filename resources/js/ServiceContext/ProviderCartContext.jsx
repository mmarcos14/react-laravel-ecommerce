import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const ProviderCartContext = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { product: [] };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
        ...prev.product,
        {
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          product_image: product.images?.[0]?.name || product.photo,
          qt: 1,
        },
      ],
    }));
  };

  const removeCart = (id) => {
    setCart((prev) => ({
      ...prev,
      product: prev.product.filter((item) => item.product_id !== id),
    }));
  };

const incrementCart=(id)=>{
 setCart(prev=>({
  ...prev,
    product:prev.product.map((item)=>
    item.product_id===id
    ?{...item,qt:Math.min(Number(item.qt||0)+1,4)}:item
  ),
 }))
}

  const decrementCart = (id) => {
    setCart((prev) => ({
      ...prev,
      product: prev.product.map((item) =>
        item.product_id === id
          ? { ...item, qt: Math.max(Number(item.qt || 0) - 1, 1) }
          : item
      ),
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        AddToCart,
        setCart,
        removeCart,
        incrementCart,
        decrementCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);