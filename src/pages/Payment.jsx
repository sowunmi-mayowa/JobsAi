import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth, db} from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFlutterwavePayment = () => {
    setLoading(true);
    setError("");

    // Initialize Flutterwave Checkout
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-637b7800aabaa177386bda05067ce0b7-X", // Replace with your Flutterwave public key
      tx_ref: `tx-${Date.now()}`, // Generate a unique transaction reference
      amount: 1000, // Replace with the amount to charge
      currency: "NGN", // Nigerian Naira
      payment_options: "card, banktransfer, ussd", // Available payment methods
      customer: {
        email: "smayowa176@ovabor.xyz", // Replace with the logged-in user's email
        name: "Ovabor Labs", // Replace with the logged-in user's name
      },
      customizations: {
        title: "JobsAI - Premium Access",
        description: "Payment for Premium Plan",
        logo: "https://example.com/logo.png", // Replace with your business logo URL
      },
      callback: async(response) => {
        setLoading(false);
        const userId = auth.currentUser.uid;
        console.log(userId)
        if (response.status === "successful") {
          try{
            const paidUserDocRef = doc(db, "paidUsers", userId);

            // Add the user to the paidUsers collection
            await setDoc(paidUserDocRef, {
                uid: userId,
                paid: true,
                timestamp: new Date() // Optional: Track when the payment was made
            });
          }catch(error){
            console.error("Error adding user to paidUsers collection:", error);
          }

          navigate("/premium"); // Redirect to the premium page after payment
        } else {
          setError("Payment was not completed. Please try again.");
        }
      },
      onclose: () => {
        setLoading(false);
        console.log("Payment window closed.");
      },
    });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/signin")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Payment</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Proceed to make payment and enjoy premium access.
        </p>

        <button
          onClick={handleFlutterwavePayment}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold text-lg 
            ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        <p className="text-red-500 text-sm mt-4 text-center cursor-pointer" onClick={handleSignOut}>Signout</p>
      </div>
    </div>
  );
};

export default Payment;
