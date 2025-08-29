import "./App.css";
import { UserProvider } from "./context/UserContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/Register";
import Login from "./Pages/LogIn";
import Navbar from "./components/Navbar";
import ProductsList from "./Pages/ProductList";
import { CartProvider } from "./context/cartContext";
import Cart from "./Pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./components/LoadingOverlay";
import { LoadingProvider } from "./context/LoadingOverlaycontext"
import { FavoritesProvider } from "./context/FavoriuteContext";
import FavoritesPage from "./Pages/Favourite";
function App() {
  return (
    <>

     <LoadingProvider>
      <UserProvider>
        <CartProvider>
          <Navbar />
          <LoadingOverlay/>
          <FavoritesProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProductsList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourite" element={<FavoritesPage />} />
          </Routes>
          </FavoritesProvider>
        </CartProvider>
      </UserProvider>


            <ToastContainer position="top-right" autoClose={2000} />

                 </LoadingProvider>


    </>
  );
}

export default App;
