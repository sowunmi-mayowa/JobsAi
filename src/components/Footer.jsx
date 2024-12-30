import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full text-gray-400 py-6 mt-8 border-t border-gray-700">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
    {/* Left Section - Branding or About */}
    <div className="flex items-center gap-4">
      <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white text-xl font-bold">
        JAi
      </div>
      <p className="text-sm">
        JObsAi © {new Date().getFullYear()} | Designed to simplify your job application process.
      </p>
    </div>

    {/* Middle Section - Links */}
    <ul className="flex space-x-6">
      <li>
        <a
          href="#"
          className="hover:text-primary transition"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#"
          className="hover:text-primary transition"
        >
          About
        </a>
      </li>
      <li>
        <a
          href="#"
          className="hover:text-primary transition"
        >
          Contact
        </a>
      </li>
    </ul>

    {/* Right Section - Social Icons */}
    <div className="flex space-x-4">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-primary transition"
      >
        <FaGithub size={20} />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-primary transition"
      >
        <FaLinkedin size={20} />
      </a>
      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-primary transition"
      >
        <FaTwitter size={20} />
      </a>
    </div>
  </div>
</footer>

  )
}

export default Footer