import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-500 p-4">
      <h1 className="text-4xl font-bold mb-4 animate-fadeIn">Welcome to GetMeChai</h1>
      <p className="text-lg mb-4 animate-fadeIn animation-delay-1000">
        At GetMeChai, we believe in delivering the finest chai experience. Our journey started with a love for authentic chai flavors and a mission to share this passion with the world.
      </p>
      <div className="mt-8 animate-fadeIn animation-delay-2000">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <p className="text-lg">
          Meet the passionate team behind GetMeChai. From our expert brewers to our friendly customer service, we are dedicated to bringing you the best chai experience.
        </p>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: ' About Get me a Chai - A crowdfunding platform for creators',
  description: '...',
}
 