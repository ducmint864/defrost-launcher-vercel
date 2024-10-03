"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import '@heroicons/react';

interface WhitelistPageProps {
  params: {
    projectID: string;
  };
}

interface Task {
  id: string;
  description: string;
  verified: boolean;
}

export default function WhitelistPage({ params }: WhitelistPageProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'followTwitter', description: 'Follow our project on Twitter', verified: false },
    { id: 'retweetPost', description: 'Retweet our latest post on X', verified: false },
    { id: 'likeFacebook', description: 'Like our Facebook page', verified: false },
    { id: 'joinDiscord', description: 'Join our Discord server', verified: false },
    { id: 'telegramGroup', description: 'Join our Telegram group', verified: false },
  ]);

  const handleVerify = async (taskId: string) => {
    // Here you would call your server-side API to verify the task
    // For now, we'll just simulate a successful verification
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          WELCOME TO THE PROJECT WITH ID {params.projectID} WHITE LIST
        </h1>
        <p className="text-center mb-6">
          Complete the following tasks to be eligible for the whitelist
        </p>

        <form>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 font-medium">Full Name:</label>
            <input type="text" id="fullName" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Connect your social accounts for identity verification:</label>
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
                <div key={task.id} className="flex items-center justify-between">
                  <span>{task.description}</span>
                  <button
                    type="button"
                    onClick={() => handleVerify(task.id)}
                    className={`px-4 py-2 rounded-full ${task.verified
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                      }`}
                    disabled={task.verified}
                  >
                    {task.verified ? 'Verified' : 'Verify'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-full">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-full">Submit</button>
          </div>
        </form>
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