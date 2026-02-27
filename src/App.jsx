import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderConfirmed from "./pages/OrderConfirmed";
import OrderTracking from "./pages/OrderTracking";
import ConfirmAddress from "./pages/ConfirmAddress";





import Navbar from "./components/Navbar";
import CartBar from "./components/CartBar";

import { getToken } from "./utils/token";

function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      {/* GLOBAL UI */}
      <Navbar />
      <CartBar />

      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/"
    element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    }
  />

  <Route
    path="/restaurant/:id"
    element={
      <PrivateRoute>
        <Menu />
      </PrivateRoute>
    }
  />

  <Route
    path="/cart"
    element={
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    }
  />

  <Route
    path="/checkout"
    element={
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    }
  />

  <Route
    path="/orders"
    element={
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    }
  />

  <Route
    path="/orders/:id"
    element={
      <PrivateRoute>
        <OrderTracking />
      </PrivateRoute>
    }
  />

  <Route
    path="/order-confirmed"
    element={
      <PrivateRoute>
        <OrderConfirmed />
      </PrivateRoute>
    }
  />

  <Route
    path="/payment-success"
    element={
      <PrivateRoute>
        <PaymentSuccess />
      </PrivateRoute>
    }
  />

<Route
  path="/confirm-address"
  element={
    <PrivateRoute>
      <ConfirmAddress />
    </PrivateRoute>
  }
/>

  <Route path="*" element={<Navigate to="/" />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
