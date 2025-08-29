import React from "react";
import { useFavorites } from "../context/FavoriuteContext";
import { useCart } from "../context/cartContext";

import BreadCreambs from "./BreadCreambs";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addProduct } = useCart();

  if (favorites.length === 0) {
    return <h2 className="text-center mt-10 text-xl">لا توجد منتجات في المفضلة ❤️</h2>;
  }

  return (
    <>
    <BreadCreambs/>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {favorites.map((product) => (
        <div key={product.id} className="border rounded-lg shadow p-4 flex flex-col">
          <img
            src={product.imageURL}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="mt-2 font-bold">{product.title}</h3>
          <p className="text-gray-600">{product.salePrice} ج.م</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => removeFromFavorites(product.id)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              remove
            </button>

            <button
              onClick={() => addProduct(product)}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default FavoritesPage;
