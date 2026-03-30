import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WorkflowText from './components/WorkflowText';
import WorkflowImage from './components/WorkflowImage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [apiKeysValid, setApiKeysValid] = useState(true);

  useEffect(() => {
    const openaiKey = process.env.REACT_APP_OPENAI_KEY;
    const geminiKey = process.env.REACT_APP_GEMINI_KEY;

    if (!openaiKey || !geminiKey) {
      setApiKeysValid(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {!apiKeysValid && (
          <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-900 mb-2">⚠️ Configuration Required</h3>
            <p className="text-yellow-800 mb-4">
              Please add your API keys to the <code className="bg-white px-2 py-1 rounded">.env</code> file:
            </p>
            <ul className="list-disc list-inside text-yellow-800 space-y-1">
              <li><code className="bg-white px-2 py-1 rounded text-sm">REACT_APP_OPENAI_KEY</code> - Get from openai.com</li>
              <li><code className="bg-white px-2 py-1 rounded text-sm">REACT_APP_GEMINI_KEY</code> - Get from makersuite.google.com</li>
            </ul>
            <p className="text-yellow-800 text-sm mt-4">
              After updating the .env file, restart the development server with <code className="bg-white px-2 py-1 rounded">npm start</code>
            </p>
          </div>
        )}


        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'text' && <WorkflowText />}
          {activeTab === 'image' && <WorkflowImage />}
        </div>


        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>
            Built with React, Tailwind CSS, and powered by OpenAI & Google Gemini
          </p>
          <p className="mt-2">
            Pear Media © 2024
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
