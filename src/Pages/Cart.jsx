import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import BreadCreambs from "./BreadCreambs";
const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  // ✅ إدارة الكوبون
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  // ✅ السعر الكلي قبل الخصم
  const total = cart.reduce(
    (acc, item) => acc + item.salePrice * (item.quantity || 1),
    0
  );

  // ✅ السعر بعد الخصم
  const finalTotal = total - (total * discount) / 100;

  // ✅ التحقق من الكوبون
  const applyCoupon = () => {
    if (coupon === "Mostafa1") {
      setDiscount(10);
      setError("");
    } else if (coupon === "DISCOUNT20") {
      setDiscount(20);
      setError("");
    } else {
      setDiscount(0);
      setError("Invalid coupon code ❌");
    }
  };

  return (
    <div className="p-6  ">
      <BreadCreambs/>
      <h2 className="text-2xl font-bold mb-4 mt-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600"
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between border p-4 rounded-lg shadow"
              >
                {/* صورة المنتج */}
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />

                {/* تفاصيل المنتج */}
                <div className="flex-1 px-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.category}</p>
                  <p className="text-blue-600 font-bold">
                    {item.salePrice} EGP
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row ">
                  {/* أزرار التحكم */}
                  <div className="flex items-center gap-2 ">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* زر الحذف */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className=" bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 "
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* إدخال الكوبون */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex items-center gap-2"
          >
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="border px-3 py-2 rounded w-60"
            />
            <button
              onClick={applyCoupon}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Apply
            </button>
          </motion.div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500"
            >
              {error}
            </motion.p>
          )}
          {discount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-bold"
            >
              Coupon applied: {discount}% OFF ✅
            </motion.p>
          )}

          {/* الإجمالي */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-right mt-6"
          >
            <h3 className="text-lg font-bold">
              Subtotal: <span className="text-gray-700">{total} EGP</span>
            </h3>
            {discount > 0 && (
              <h3 className="text-xl font-bold">
                Total after discount:{" "}
                <span className="text-blue-600">{finalTotal} EGP</span>
              </h3>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
