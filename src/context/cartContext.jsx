import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [discount, setDiscount] = useState(0);

  // ✅ الأكواد المسموحة
  const coupons = {
    SAVE10: 0.1,  // خصم 10%
    SAVE50: 50,   // خصم 50 جنيه
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const applyCoupon = (code) => {
    if (coupons[code]) {
      setDiscount(coupons[code]);
      return true;
    }
    setDiscount(0);
    return false;
  };

  // ✅ الحسابات
  const subtotal = cart.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );

  const total =
    typeof discount === "number" && discount < 1
      ? subtotal - subtotal * discount
      : subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        subtotal,
        total,
        discount,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
