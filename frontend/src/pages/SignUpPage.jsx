import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from 'lucide-react';


import { Link } from "react-router";


function SignUpPage() {

  const [formData, setFormData] = useState({ fullName: "", Email: "", Password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[600px] h-[750px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full">
            

            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">
                    Signup for a new Account
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/*full name */}

                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="Sushant kumar"
                      />
                    </div>
                  </div>
                  {/*Email*/}
                  <div>

                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.Email}
                        onChange={(e) =>
                          setFormData({ ...formData, Email: e.target.value })
                        }
                        className="input"
                        placeholder="abc@gmail.com"
                      />
                    </div>
                  </div>
                  {/*Password*/}
                  <div>

                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.Password}
                        onChange={(e) =>
                          setFormData({ ...formData, Password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your Password"
                      />
                    </div>
                  </div>

                  {/*submit button */}

                  <button className='auth-btn' type='submit' disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : ("Create account"

                    )}

                  </button>


                </form>

                {/*redirect to login */}

                <div className='mt-6 text-center'>
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>

                </div>

              </div>
              

            </div>
              {/*Form illustration right side */}
              <div className='hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>
                <div>
                  <img
                    src="/login.png" alt="people chatting"
                    className='w-full h-auto object-contain' />
                    <div className='mt-6 text-center'>
                     <h3 className='text-xl font-medium text-cyan-400'>Start Messaging Today with Us</h3>
                  
                    </div>
                </div>
              </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );


}

export default SignUpPage;
