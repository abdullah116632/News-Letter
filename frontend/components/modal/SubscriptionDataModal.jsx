"use client";
import { useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const SubscriptionDataModal = ({ data: modalData, onClose }) => {
  const { startingDate, endingDate, serviceType:subsCribedService } = modalData.subscriptionData || {};
  const serviceType = modalData.serviceType;
  const price = modalData.price;

  const [loading, setLoading] = useState(false);

  const handleRenew = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/renew`,
        { price, serviceType },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.success) {
        window.location.replace(data.url);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Renewal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Subscription Info
        </h2>

        {/* Info */}
        <div className="text-gray-800 text-sm space-y-2 mb-4">
          <p>
            <strong>Starting Date:</strong>{" "}
            {startingDate ? new Date(startingDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Ending Date:</strong>{" "}
            {endingDate ? new Date(endingDate).toLocaleDateString() : "N/A"}
          </p>
          <p className="border-b border-b-black pb-2">
            <strong>Subscribed package:</strong>{" "}
            {subsCribedService}
          </p>
          <p>
            <strong>Selected Package Price:</strong> ${price}
          </p>
        </div>

        {/* Renew Button */}
        <button
          onClick={handleRenew}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Renew Package"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionDataModal;
