import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { selectedAddress, addAddress, selectAddress } = useAddress();
  const { query, setQuery } = useSearch();

  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState("");
  const [details, setDetails] = useState("");

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  // keep modal inputs in sync with selected address
  useEffect(() => {
    if (selectedAddress) {
      setLabel(selectedAddress.label || "");
      setDetails(selectedAddress.details || "");
    } else {
      setLabel("");
      setDetails("");
    }
  }, [selectedAddress]);

  function saveAddress() {
  if (!label || !details) {
    alert("Please enter address");
    return;
  }

  const newAddress = { label, details };

  addAddress(newAddress);      // save to addresses[]
  selectAddress(newAddress);   // mark as selected

  setShowModal(false);
}

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-orange-500 cursor-pointer"
            >
              FoodHive
            </h1>

            {/* ADDRESS */}
            <div
              onClick={() => setShowModal(true)}
              className="hidden md:flex flex-col text-sm cursor-pointer"
            >
              <span className="font-semibold text-gray-800 flex items-center gap-1">
                {selectedAddress?.label || "Select location"}
                <span className="text-orange-500">▾</span>
              </span>
              <span className="text-gray-500 text-xs max-w-[180px] truncate">
                {selectedAddress?.details || "Add delivery address"}
              </span>
            </div>
          </div>

          {/* CENTER SEARCH */}
          <div className="hidden lg:flex flex-1 mx-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for restaurants or dishes"
              className="w-full max-w-xl border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <button className="hidden md:flex hover:text-black">Help</button>

            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-1 hover:text-black"
            >
              Cart
              {totalItems > 0 && (
                <span className="ml-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-orange-500 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="hidden md:flex hover:text-black">
              Profile
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="text-gray-500 hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ADDRESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add delivery address
            </h2>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                placeholder="Home / Work"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                rows={3}
                placeholder="Enter full delivery address"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border rounded-lg py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="flex-1 bg-orange-500 text-white rounded-lg py-2 text-sm font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
