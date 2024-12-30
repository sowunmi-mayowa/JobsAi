import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaRocket, FaGoogle } from 'react-icons/fa';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, provider, db } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer';

const SignIn = () => {
    const navigate = useNavigate()

    const schema = yup.object().shape({
        email:yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    })

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
    })

    // const onSubmitHandler = (data) => {
    //     signInWithEmailAndPassword(auth, data.email, data.password)
    //     .then((userCredential) => {
    //         // Signed in 
    //         const user = userCredential.user;
    //         console.log("signed in ", user)
    //         navigate("/payment")
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //     });
    // } 

    // const handleSignInWithGoogle = async () => {
    //         try {
    //             const result = await signInWithPopup(auth, provider);
    //             const user = result.user;

    //             toast.success('Signed in with Google successfully!');
    //             navigate('/payment');
    //         } catch (error) {
    //             toast.error('Failed to sign in with Google');
    //             console.error('Error:', error);
    //         }
    //   };

    const onSubmitHandler = async (data) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
    
        // Check if the user has paid
        const paidUserDocRef = doc(db, "paidUsers", user.uid);
        const paidUserDoc = await getDoc(paidUserDocRef);
    
        if (paidUserDoc.exists()) {
          // User has paid
          console.log("User has paid:", paidUserDoc.data());
          navigate("/premium");
        } else {
          // User hasn't paid
          toast.error("You need to complete payment before accessing your account.");
          navigate("/payment");
          console.log("User has not paid.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
        toast.error("Failed to sign in. Please check your email and password.");
      }
    };
      const handleSignInWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
      
          // Check if the user has paid
          const paidUserDocRef = doc(db, "paidUsers", user.uid);
          const paidUserDoc = await getDoc(paidUserDocRef);
      
          if (paidUserDoc.exists()) {
            // User has paid
            console.log("User has paid:", paidUserDoc.data());
            navigate("/premium");
          } else {
            // User hasn't paid
            toast.error("You need to complete payment before accessing your account.");
            navigate("/payment");
            console.log("User has not paid.");
          }
        } catch (error) {
          console.error("Error signing in with Google:", error);
          toast.error("Failed to sign in with Google.");
        }
      };
      

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 bg-[#1a1a1a]/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-800/50">
            <div className="text-center">
              <FaRocket className="mx-auto h-12 w-12 text-purple-500" />
              <h2 className="mt-6 text-3xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <FaEnvelope className="mr-2 text-purple-400" />
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    {...register("email")}
                    className="mt-1 block w-full px-3 py-2 bg-dark/50 backdrop-blur-sm border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <FaLock className="mr-2 text-purple-400" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    {...register("password")}
                    className="mt-1 block w-full px-3 py-2 bg-dark/50 backdrop-blur-sm border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  Sign in
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-700/50 rounded-md shadow-sm text-sm font-medium text-white bg-dark/50 backdrop-blur-sm hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                  onClick={handleSignInWithGoogle}
                >
                  <FaGoogle className="text-lg" />
                  Sign in with Google
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-gray-400">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="font-medium text-purple-500 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default SignIn