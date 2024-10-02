import React from 'react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-9xl font-extrabold text-gray-900">
            404
          </h2>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go back home
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-base text-gray-500">
            If you think this is a mistake, please{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              contact support
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}