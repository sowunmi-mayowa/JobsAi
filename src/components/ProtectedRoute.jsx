import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../config/firebase"; // Make sure you import Firestore (db)
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isPaid, setIsPaid] = useState(false); // Payment status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Check if the user exists in the paidUsers collection
        const paidUserDocRef = doc(db, "paidUsers", currentUser.uid);
        const paidUserDoc = await getDoc(paidUserDocRef);

        if (paidUserDoc.exists()) {
          setIsPaid(true);
        }
      }
      setLoading(false); // Set loading to false once both checks are complete
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // While checking auth and payment status, show a loading indicator
    return <div>Loading...</div>; // Replace with a spinner or loading component if needed
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/signin" />;
  }

  if (!isPaid) {
    // Redirect to the payment page if the user hasn't paid
    return <Navigate to="/payment" />;
  }

  // Allow access to the route if the user is authenticated and has paid
  return children;
};

export default ProtectedRoute;
