import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const handleSignOut = () => {
        if(confirm("Are you sure you want to logout?")){
            signOut(auth).then(() => {
              navigate("/signin")
            }).catch((error) => {
                console.error('Error:', error);
                alert("Some error occurred. Please try again.");
            });
        }
    }
  return (
    <div className='flex justify-between items-center py-4 mx-16'>
        <Link to="/">
            <h1 className='text-2xl font-bold'>JobsAI</h1>
        </Link>
        {
            !auth.currentUser ? (
                <div>
                    <Link>Contact Us</Link>
                </div>
            ) : (
                <div>
                   <button className='bg-primary text-white px-4 py-2 rounded hover:scale-95' onClick={handleSignOut}>Logout</button>
                </div>
            )
        }
    </div>
  )
}

export default Navbar