import { useState } from 'react';
import { FaGithub, FaLink, FaLinkedin, FaSpinner } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Markdown from 'markdown-to-jsx';
import Footer from '../components/Footer';


function FreePlan() {
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [taskId, setTaskId] = useState('');
  const [state, setState] = useState('');
  const [status, setStatus] = useState('');
  const [lastStep, setLastStep] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    jobUrl: yup.string().url().required("Job URL is required"),
    githubUrl: yup
      .string()
      .url("Github URL must be a valid URL")
      .required("Github URL is required"),
      linkedinUrl: yup
      .string()
      .url("Linkedin URL must be a valid URL")
      .required("Linkedin URL is required"),
    personalNote: yup.string().required("Personal Note is required"),
  })

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  });
  
  
  const onSubmitHandler = async(data, event) => {

    event.preventDefault();
    console.log(data);
    setLoading(true);
    try {
      const kickoffResponse = await fetch(`https://tailored-resume-crew-7892b1b5-a563-45eb-a0b-d34f8a54.crewai.com/kickoff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 5a2ea94eed8d`
        },
        body: JSON.stringify({
          inputs: {
            github_url: data.githubUrl,
            job_posting_url: data.jobUrl,
            linkedin_url: data.linkedinUrl,
            personal_writeup: data.personalNote
          }
        })
      });
      const kickoffData = await kickoffResponse.json();
      setTaskId(kickoffData.kickoff_id);
      pollStatus(kickoffData.kickoff_id);
    } catch (error) {
      console.error('Error starting crew:', error);
      setIsLoading(false);
    }
  }
  
  const pollStatus = async (id) => {
    try {
      const statusResponse = await fetch(`https://tailored-resume-crew-7892b1b5-a563-45eb-a0b-d34f8a54.crewai.com/status/${id}`, {
        headers: {
          'Authorization': `Bearer 5a2ea94eed8d`
        }
      });
      const statusData = await statusResponse.json();
      setState(statusData.state);
      setStatus(statusData.status);
      setResult(statusData.result);

      if (statusData.state === 'SUCCESS') {
        setLoading(false);
      } 
      else if(statusData.state === 'FAILED') {
        setLoading(false);
      }
      else {
        setTimeout(() => pollStatus(id), 10000);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
      setTimeout(() => pollStatus(id), 10000);
    }
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Free Resume Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get started with our free plan. Enter your details below and we'll help you create
            a tailored resume that matches the job requirements.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Submit Your Details</h2>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <FaLink className="text-primary" />
                  Job Posting URL
                </div>
                <input
                  type="url"
                  name="jobUrl"
                  placeholder="https://company.com/job-posting"
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" {...register('jobUrl')}
                />
                <p className='text-red-500'> {errors.jobUrl?.message} </p>
              </label>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <FaGithub className="text-primary" />
                  GitHub Profile URL
                </div>
                <input
                  type="url"
                  name="githubUrl"
                  placeholder="https://github.com/yourusername"
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register('githubUrl')}
                />
                <p className='text-red-500'> {errors.githubUrl?.message} </p>
              </label>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <FaLinkedin className="text-primary" />
                  Linkedin Profile URL
                </div>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https://github.com/yourusername"
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register('linkedinUrl')}
                />
                <p className='text-red-500'> {errors.linkedinUrl?.message} </p>
              </label>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <MdDescription className="text-primary" />
                  Personal Write-up
                </div>
                <textarea
                  name="personalNote"
                  placeholder="Tell us about yourself and why you're interested in this position..."
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register('personalNote')}
                />
                <p className='text-red-500'> {errors.personalNote?.message} </p>
              </label>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-medium transition"
              >
                Generate Resume
              </button>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Generated Resume</h2>
            {taskId && state !== 'SUCCESS' && (
              <div className="mt-4 p-4 ">
                <p className="text-sm text-white text-left"><strong>Task ID:</strong> {taskId}</p>
                <p className="text-sm text-white text-left"><strong>State:</strong> {state}</p>
                <p className="text-sm text-white text-left"><strong>Status:</strong> {status}</p>
              </div>
            )}
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-24">
                <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
                <p className="text-gray-400">Generating your resume...</p>
              </div>
            ) : !result ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                <p className="text-lg mb-2">No resume generated yet</p>
                <p>Fill out the form to generate your tailored resume</p>
              </div>
            ) : (
              <div className="prose prose-invert  text-left h-[580px] overflow-y-scroll">
                {result && (
                  <div className="mt-2 md:mt-4 p-2 md:p-4 ">
                    <h3 className="text-sm font-medium">Final Result</h3>
                    <div className="text-sm  break-words whitespace-pre-wrap">
                      <Markdown>{result}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Tips for Better Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">Job Posting URL</h3>
              <p className="text-gray-400">
                Provide the complete URL to the job posting. Make sure it's accessible
                and contains the full job description for better analysis.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">GitHub Profile</h3>
              <p className="text-gray-400">
                Ensure your GitHub profile is public and contains relevant projects
                that showcase your skills related to the job.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FreePlan;