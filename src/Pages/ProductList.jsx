import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useFavorites } from "../context/FavoriuteContext"; // ✅ استدعاء المفضلة
import products from "../data/Products";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"; // ✅ قلب فاضي ومليان

const ProductsList = () => {
  const { addProduct } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites(); // ✅ دوال المفضلة

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    Math.min(endIndex, products.length)
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <div className="p-6 relative">
      {/* ✅ شاشة لودينج */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <span className="loading loading-infinity loading-lg text-white"></span>
        </div>
      )}

      {/* ✅ المنتجات */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition"
          >
            <figure>
              <img
                src={product.imageURL}
                alt={product.title}
                className="h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.salePrice} EGP</p>

              <div className="flex justify-between items-center">
                {/* زر الكارت */}
                <button
                  onClick={() => addProduct(product)}
                  className="btn btn-primary"
                >
                  🛒 Add to Cart
                </button>

                {/* زر القلب */}
                {isFavorite(product.id) ? (
                  <IoMdHeart
                    onClick={() => removeFromFavorites(product.id)}
                    className="text-red-500 text-3xl cursor-pointer hover:scale-110 transition"
                  />
                ) : (
                  <IoMdHeartEmpty
                    onClick={() => addToFavorites(product)}
                    className="text-gray-400 text-3xl cursor-pointer hover:scale-110 transition"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ✅ الباجينيشن */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductsList;
