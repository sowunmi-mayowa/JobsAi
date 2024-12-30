import { FaRocket, FaGithub, FaFileAlt } from 'react-icons/fa';
import { BsLightningCharge } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import pricing from '../assets/pricing.png';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="flex justify-center mb-6">
              <FaRocket className="text-6xl text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Job Application Assistant
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Let our expert system tailor your job application to stand out from the crowd.
              We'll analyze the job posting and your profile to create the perfect match.
            </p>
    
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="p-6 rounded-lg bg-gray-800/50">
                <FaFileAlt className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Job Analysis</h3>
                <p className="text-gray-400">We analyze the job posting to identify key requirements and skills</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/50">
                <FaGithub className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Profile Review</h3>
                <p className="text-gray-400">We review your GitHub profile to highlight relevant projects and skills</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/50">
                <BsLightningCharge className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Tailoring</h3>
                <p className="text-gray-400">We craft a personalized application that matches you with the role</p>
              </div>
            </div>
    
            {/* Pricing Plans */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="p-8 rounded-lg bg-gray-800/50 border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
                <p className="text-gray-400 mb-6">Perfect for getting started</p>
                <div className="text-4xl font-bold mb-6">$0</div>
                  <ul className="text-left space-y-4 mb-8">
                    <li className="flex items-center">⚡ Tailored resume</li>
                  </ul>
                <Link to={"/free"}>
                    <button className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 transition">
                    Get Started
                    </button>
                </Link>
              </div>
    
              {/* Premium Plan */}
              <div className="p-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary">
                <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
                <p className="text-gray-400 mb-6">For serious job seekers</p>
                <div className="text-4xl font-bold mb-6">$29</div>
                <ul className="text-left space-y-4 mb-8">
                    <li>⚡ Tailored resume</li>
                    <li>⚡ Customized cover letter</li>
                    <li>⚡ Possible interview questions</li>
                </ul>
                <Link to={"/signup"}>
                  <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition">
                    Upgrade Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <section className=" py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Pricing Explanation</h2>
              <p className="text-white0 mb-6">
                We believe in transparency. The reason we charge for our premium services is due to the costs associated with the tools we use. Our services rely on OpenAI's powerful APIs to provide advanced AI-powered features.
              </p>
              <div className="flex justify-center">
                <img
                  src={pricing}
                  alt="OpenAI Pricing"
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
              <p className="text-white mt-6">
                As shown above, OpenAI charges us for every API call we make, based on the type of processing (text, audio, etc.). To continue providing you with high-quality, tailored job application tools while covering these expenses, we offer affordable plans like the Premium Plan.
              </p>
            </div>
          </section>
          <Footer />
        </div>
  )
}

export default Home