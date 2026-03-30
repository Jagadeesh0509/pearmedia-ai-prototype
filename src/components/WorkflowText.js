import React, { useState } from 'react';
import { Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import ImageCard from './ImageCard';
import {
  getEnhancedPrompt,
  generateImage,
  validateApiKeys
} from '../utils/apiHelpers';
import { LOADING_MESSAGES, STEPS } from '../utils/constants';

const WorkflowText = () => {
  const [step, setStep] = useState(STEPS.INPUT);
  const [userPrompt, setUserPrompt] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(null);
  const handleEnhance = async () => {
    if (!userPrompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      validateApiKeys();
      setIsLoading(true);
      setError(null);
      setStatusMessage(LOADING_MESSAGES.enhancing);

      const enhanced = await getEnhancedPrompt(userPrompt);
      setEditedPrompt(enhanced);
      setStep(STEPS.APPROVE);
      setStatusMessage('');
    } catch (err) {
      setError(err.message);
      setStatusMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      validateApiKeys();
      setIsLoading(true);
      setError(null);
      setStatusMessage(LOADING_MESSAGES.generating);

      const imageUrl = await generateImage(editedPrompt);
      setGeneratedImageUrl(imageUrl);
      setStep(STEPS.COMPLETE);
      setStatusMessage('');
    } catch (err) {
      setError(err.message);
      setStatusMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(STEPS.INPUT);
    setUserPrompt('');
    setEditedPrompt('');
    setGeneratedImageUrl(null);
    setError(null);
    setStatusMessage('');
  };

  const handleRegenerate = async () => {
    setStep(STEPS.INPUT);
    setGeneratedImageUrl(null);
    setStatusMessage('');

  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {statusMessage && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3 items-center">
          <div className="animate-spin">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-blue-800">{statusMessage}</p>
        </div>
      )}
      {step === STEPS.INPUT && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Creative Studio</h2>
            <p className="text-gray-600">Enter your creative vision. Our AI will enhance it into a detailed image prompt.</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Prompt
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="E.g., 'crystal cave underwater with bioluminescent creatures...'"
              className="w-full h-40 p-4 border-2 text-black border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={handleEnhance}
            disabled={isLoading || !userPrompt.trim()}
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Enhance with AI
          </button>
        </div>
      )}
      {step === STEPS.APPROVE && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Original Prompt</h3>
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 mb-4">
              <p className="text-gray-700">{userPrompt}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-black mb-4">AI-Enhanced Prompt</h3>
            <textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="w-full h-40 p-4 border-2 text-black border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none mb-4 resize-none"
            />
            <p className="text-sm text-gray-500 mb-4">Feel free to edit before generating</p>
          </div>
          <div className="lg:col-span-2 flex gap-4">
            <button
              onClick={() => setStep(STEPS.INPUT)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
            >
              Back
            </button>
            <button
              onClick={handleGenerateImage}
              disabled={isLoading || !editedPrompt.trim()}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <ArrowRight size={20} />
              Generate Image
            </button>
          </div>
        </div>
      )}
      {step === STEPS.COMPLETE && (
        <div className="space-y-8">
          <ImageCard
            imageUrl={generatedImageUrl}
            title="Generated Image"
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Used Prompt</h3>
            <p className="text-gray-700 mb-6">{editedPrompt}</p>
            <button
              onClick={handleReset}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowText;
