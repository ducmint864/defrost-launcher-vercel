import React from 'react';

interface WhitelistPageProps {
  params: {
    projectID: string;
  };
}

export default function WhitelistPage({ params }: WhitelistPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          WELCOME TO THE PROJECT WITH ID {params.projectID} WHITE LIST
        </h1>
        <p className="text-center mb-6">
          Fill in the below form to submit for project whitelist approval
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
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Social Media:</label>
            <div className="flex items-center space-x-4">
              {/* <button type="button" className="p-2 border rounded-md"> */}
			  <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-md">

                {/* <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" /> */}
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
</svg>
              {/* </button> */}
			  </a>
			  <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-md">

              {/* <button type="button" className="p-2 border rounded-md"> */}
                {/* <img src="/twitter-icon.svg" alt="Twitter" className="w-6 h-6" /> */}
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path d="M 12.5 6 C 8.9280619 6 6 8.9280619 6 12.5 L 6 35.5 C 6 39.071938 8.9280619 42 12.5 42 L 35.5 42 C 39.071938 42 42 39.071938 42 35.5 L 42 12.5 C 42 8.9280619 39.071938 6 35.5 6 L 12.5 6 z M 12.5 9 L 35.5 9 C 37.450062 9 39 10.549938 39 12.5 L 39 35.5 C 39 37.450062 37.450062 39 35.5 39 L 12.5 39 C 10.549938 39 9 37.450062 9 35.5 L 9 12.5 C 9 10.549938 10.549938 9 12.5 9 z M 13.828125 14 L 21.564453 25.056641 L 13.822266 34 L 15.865234 34 L 22.46875 26.351562 L 27.820312 34 L 34.257812 34 L 26.025391 22.234375 L 33.136719 14 L 31.136719 14 L 25.123047 20.943359 L 20.265625 14 L 13.828125 14 z M 16.935547 15.695312 L 19.498047 15.695312 L 31.150391 32.304688 L 28.587891 32.304688 L 16.935547 15.695312 z"></path>
</svg>
			 {/* </button> */}
			 </a>
              <span className="ml-2">Have you follow us and repost the latest post yet?</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="proofOfEngagement" className="block mb-2 font-medium">Proof of engagement:</label>
            <input type="text" id="proofOfEngagement" className="w-full px-3 py-2 border rounded-md" />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
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
