import { useState } from 'react';
import { Wrench, Settings, ChevronRight } from 'lucide-react';
import hero from "../../assets/hero.png"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
<div 
      className="relative w-full min-h-120 text-white shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero} 
          alt="Tools background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Optional dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 py-8 mt-10 px-4 md:px-8 lg:px-12 h-full">
        

        
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full">
          {/* Left content */}
          <div className="flex flex-col max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Professional Tools Platform
            </h1>
            <p className="text-gray-200 text-lg mb-6">
              High-quality tools and resources for professionals. Find everything you need for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-all">
                Explore Tools
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 px-6 py-3 rounded-lg font-bold transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Right content - Tool icon */}
          <div className="mt-8 md:mt-0">
            <div className="bg-white p-6 rounded-full shadow-lg">
              <Wrench className="w-16 h-16 text-blue-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}