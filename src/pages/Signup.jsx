import { auth, provider, db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaRocket } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
const Signup = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').max(32).required('Password is required')
    });
   
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
   
    const onSubmitHandler = async(data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            
            await addDoc(collection(db, 'users'), {
                name: data.name,
                email: data.email,
                uid: userCredential.user.uid,
                createdAt: new Date()
            });

            toast.success('Account created successfully!');
            navigate('/payment');
        } catch (error) {
            toast.error(error.message);
            console.error('Error:', error);
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await addDoc(collection(db, 'users'), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                createdAt: new Date()
            });

            toast.success('Signed in with Google successfully!');
            navigate('/payment');
        } catch (error) {
            toast.error('Failed to sign in with Google');
            console.error('Error:', error);
        }
    };

    return (
        <div className='min-h-screen relative overflow-hidden'>
          
            <div className="relative z-10">
                    <div className="min-h-screen flex items-center justify-center p-4">
                      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a]/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-800/50">
                        <div className="text-center">
                          <FaRocket className="mx-auto h-12 w-12 text-purple-500" />
                          <h2 className="mt-6 text-3xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Sign up
                          </h2>
                        </div>
            
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
                          <div className="space-y-4">
                          <div>
                              <label className="flex items-center text-sm font-medium text-gray-300">
                                <FaEnvelope className="mr-2 text-purple-400" />
                                Full name
                              </label>
                              <input
                                type="text"
                                name="name"
                                {...register("name")}
                                className="mt-1 block w-full px-3 py-2 bg-dark/50 backdrop-blur-sm border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                              />
                              <p className='text-red-500'>{errors.name?.message}</p>
                            </div>
                            <div>
                              <label className="flex items-center text-sm font-medium text-gray-300">
                                <FaEnvelope className="mr-2 text-purple-400" />
                                Email address
                              </label>
                              <input
                                type="email"
                                name="email"
                                {...register("email")}
                                className="mt-1 block w-full px-3 py-2 bg-dark/50 backdrop-blur-sm border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                              />
                              <p className='text-red-500'>{errors.email?.message}</p>
                            </div>
            
                            <div>
                              <label className="flex items-center text-sm font-medium text-gray-300">
                                <FaLock className="mr-2 text-purple-400" />
                                Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                {...register("password")}
                                className="mt-1 block w-full px-3 py-2 bg-dark/50 backdrop-blur-sm border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                              />
                              <p className='text-red-500'>{errors.password?.message}</p>
                            </div>
                          </div>
            
                          <div className="space-y-4">
                            <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                            >
                              Sign up
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
                              to="/signin"
                              className="font-medium text-purple-500 hover:text-blue-500 transition-colors duration-200"
                            >
                              Sign in
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
};

export default Signup;