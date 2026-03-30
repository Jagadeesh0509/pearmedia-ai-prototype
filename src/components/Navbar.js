import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

const Navbar = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2">
              <Palette className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">Pear Media</h1>
          </div>

          <p className="hidden md:block text-indigo-100 text-sm">
            Bridging AI and Creativity
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => onTabChange('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'text'
                  ? 'bg-white text-indigo-600'
                  : 'text-white hover:bg-indigo-500'
              }`}
            >
              <Sparkles size={18} />
              <span>Creative Studio</span>
            </button>
            <button
              onClick={() => onTabChange('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'image'
                  ? 'bg-white text-indigo-600'
                  : 'text-white hover:bg-indigo-500'
              }`}
            >
              <Palette size={18} />
              <span>Style Lab</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
