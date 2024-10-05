'use client'

import React, { useState, useEffect } from 'react';
import { Loading } from '@/components/loading';
import { WhitelistProps } from '@/app/whitelist/types';
import { SocialTask } from '@/app/whitelist/types';
import Image from 'next/image';
import '@heroicons/react'
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Whitelist({ projectID }: WhitelistProps) {
  // Social tasks states
  const [tasks, setTasks] = useState<SocialTask[]>([
    { id: 'followTwitter', description: 'Follow our project on Twitter', verified: false },
    { id: 'retweetPost', description: 'Retweet our latest post on X', verified: false },
    { id: 'likeFacebook', description: 'Like our Facebook page', verified: false },
    { id: 'joinDiscord', description: 'Join our Discord server', verified: false },
    { id: 'telegramGroup', description: 'Join our Telegram group', verified: false },
  ]);

  const handleVerifyTasks = async (taskId: string) => {
    // call server-side api later
    // for now, we'll just simulate a successful verification
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, verified: true } : task
    );
    setTasks(updatedTasks);
  };

  const socialConnects = [
    { name: 'Google', icon: '/google-icon.svg' },
    { name: 'Facebook', icon: '/images/social-icons/facebook.png' },
    { name: 'X', icon: '/images/social/twitter.png' },
    { name: 'LinkedIn', icon: '/linkedin-icon.svg' },
  ];

  const handleSocialConnect = (socialName: string) => {
    // Implement social media connection logic here
    console.log(`Connecting to ${socialName}`);
  };

  // Full name states
  const [fullName, setFullName] = useState('');

  // Email & OTP states
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [isOTPVerifying, setIsVerifying] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string>('');
  const [isOTPTimedOut, setIsOTPTimedOut] = useState<boolean | null>(null);
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(false);

  const checkEmailVerified = () => {
    // const verifiedStatus = localStorage.getItem('emailVerified');
    // const isVerified = verifiedStatus === 'true';

    const isVerified = false;
    setEmailVerified(isVerified);
    // if (isVerified) {
    //   localStorage.setItem('emailVerified', 'false');
    // }
  };

  const handleVerifyEmailClick = () => {
    // validate input
    if (!email || !fullName) {
      // TODO: show error message
      return;
    }
    if (isOTPTimedOut === null) {
      setIsSendingOTP(true);
      sendOTPViaEmail();
    }

    (document.getElementById('emailOTPModal') as HTMLDialogElement).showModal();
  }

  const handleResendOTP = () => {
    const OTPModal = document.getElementById("emailOTPModal") as any
    OTPModal.close();
    setIsSendingOTP(true);
    setIsOTPTimedOut(null);
    sendOTPViaEmail();
    OTPModal.showModal();
  }

  const handleOTPSubmit = async (otp: string): Promise<boolean> => {
    if (!otp) {
      return false;;
    }

    setIsVerifying(true);

    // call server-side api
    try {
      const response = await fetch('/api/auth/email/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, email, projectID }),
      });

      if (response.ok) {
        alert('OTP verified successfully!');
        setEmailVerified(true);
      } else {
        alert('OTP verification failed. Please try again.');
        setEmailVerified(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }


    return true;
  }

  // check email verification status periodically
  useEffect(() => {
    if (email) {
      // 2 seconds delay b4 checking email verification status
      const intervalId = setInterval(checkEmailVerified, 2000);
      return () => clearInterval(intervalId);
    }
  }, [email]);


  // check email verification status on page load
  useEffect(() => {
    // Check immediately
    checkEmailVerified();

    // Set up periodic checking
    const intervalId = setInterval(checkEmailVerified, 2000); // Check every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  const sendOTPViaEmail = async () => {
    try {
      const response = await fetch('/api/auth/email/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, projectID, fullName }),
      });

      if (response.ok) {
        alert('Verification email sent. Please check your inbox.');
        setIsOTPTimedOut(false);
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSendingOTP(false);
    }
  };

  // function to display OTP TTL:
  const OTPTimer = ({ minutes }: { minutes: number }) => {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(minutes);
    useEffect(() => {
      const intervalID = setInterval(() => {
        if (second <= 0 && minute <= 0) {
          setIsOTPTimedOut(true);
          return;
        }

        setSecond(second - 1);
        if (second <= 0) {
          setSecond(59);
          setMinute(minute - 1);
        }

      }, 1000);
      return () => clearInterval(intervalID);
    }, [second]);

    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    const formattedSecond = second < 10 ? `0${second}` : second;

    return (
      <p>OTP expires in: {formattedMinute}:{formattedSecond}</p>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-tr from-transparent via-blue-300/40 to-purple-400/20 animate-[pulse_7s_ease-in-out_infinite] -z-10"></div>
      <div className="relative">
        <div className="shadow-full backdrop-blur-sm rounded-2xl p-6 bg-neutral border-2 border-opacity-20 border-white/20 bg-gradient-to-br from-white/10 to-white/5">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-20 blur-xl"></div>
          <div className="relative z-10">

            <h1 className="text-2xl font-bold text-center mb-6 text-neutral-content">
              WELCOME TO THE PROJECT WITH ID {projectID} WHITE LIST
            </h1>
            <p className="text-center mb-6">
              Complete the following tasks to be eligible for the whitelist
            </p>

            <form>
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2 font-medium">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-3 py-2 bg-neutral border border-secondary rounded-lg"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral border border-secondary rounded-lg"
                />
              </div>

              <dialog id="emailOTPModal" className="modal">
                {/* don't show OTP modal until isOTPTimedOut is not null (OTP has been sent) */}
                {isOTPTimedOut !== null && (
                  <div id='modalContent' className="modal-box backdrop-blur-lg transition-all duration-300 bg-transparent">
                    <h3 className="font-bold text-lg">Email Verification</h3>
                    <p className='py-1 text-sm'>
                      {isOTPTimedOut === true ? 'OTP timed out!' : <OTPTimer minutes={parseInt(process.env.NEXT_PUBLIC_OTP_TTL_MINUTES || '5')} />}
                    </p><br />
                    <p className="py-4">Enter the 6-digit OTP sent to your email:</p>
                    <form className="flex flex-col items-center" onSubmit={(e) => { e.preventDefault(); handleOTPSubmit(OTP) }}>
                      <div className="flex space-x-3 mb-4">
                        {[...Array(6)].map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-xl border rounded-md"
                            required
                            disabled={isOTPVerifying || isOTPTimedOut}
                            onKeyUp={(e) => {
                              const target = e.target as HTMLInputElement;
                              if (target.value.length === 1) {
                                const nextSibling = target.nextElementSibling as HTMLInputElement | null;
                                let newOtp = OTP.slice(0, index) + target.value + OTP.slice(index + 1);
                                newOtp = newOtp.trim();
                                setOTP(newOtp)
                                if (nextSibling) {
                                  nextSibling.focus();
                                }
                              } else if (target.value.length === 0) {
                                const previousSibling = target.previousElementSibling as HTMLInputElement | null;
                                if (previousSibling) {
                                  previousSibling.focus();
                                }
                              }
                            }}
                            onInput={(e) => {
                              const target = e.target as HTMLInputElement;
                              target.value = target.value.replace(/[^0-9]/g, '');
                            }}
                          />
                        ))}
                      </div>
                      <button type="submit" className="btn btn-primary">Verify OTP</button>
                    </form>

                    {/* Option to resend OTP after OTP has expired */}
                    {isOTPTimedOut === true && (
                      <p className='justify-between text-center py-4 text-sm'>Didn't receive OTP?
                        <a onClick={handleResendOTP} className='font-bold hover:underline text-success cursor-pointer'> Resend OTP</a>
                      </p>
                    )}
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                )}
              </dialog>

              <button
                type="button"
                onClick={handleVerifyEmailClick}
                disabled={emailVerified === true}
                className={`mb-6 mt-2 px-4 py-2 rounded-md flex items-center justify-center border border-black ${emailVerified
                  ? 'bg-white text-black'
                  : 'bg-white text-black hover:bg-gray-100'
                  }`}
              >
                {emailVerified ?
                  <div className="flex items-center justify-center space-x-2">
                    <p className="mr-2">Email Verified</p>
                    <Image src="/images/icons/icons8-verified-25.png" alt="Email Verified" width={25} height={25} />
                  </div>
                  : (isSendingOTP ? <Loading /> : 'Verify Email')}
              </button>
              <div className="mb-6">
                <label className="block mb-2 font-bold text-lg">Connect your social accounts for identity verification:</label>
                <div className="flex flex-wrap justify-center gap-2">
                  {socialConnects.map((social) => (
                    <button
                      key={social.name}
                      type="button"
                      onClick={() => handleSocialConnect(social.name)}
                      className="flex items-center p-2 border rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Image src={social.icon} alt={social.name} width={16} height={16} />
                      <span className="ml-2 text-sm">{social.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Proof of engagement</label>
                <div className="space-y-2">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-700 rounded-full p-2">
                          <XMarkIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white">{task.description}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleVerifyTasks(task.id)}
                        className={`px-4 py-2 rounded-md ${task.verified ? 'bg-gray-700 text-gray-400' : 'bg-white text-black'
                          }`}
                        disabled={task.verified}
                      >
                        {task.verified ? 'Verified' : 'Start'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" className="px-4 py-2 bg-neutral text-neutral-content rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-success text-success-content rounded-md">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">WHITELIST GUIDE</h2>
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-px bg-gray-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
}