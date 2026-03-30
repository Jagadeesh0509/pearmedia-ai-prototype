import React, { useState } from 'react';
import { Upload, Sparkles, AlertCircle } from 'lucide-react';
import ImageCard from './ImageCard';
import {
  fileToBase64,
  analyzeImage,
  generateImageVariation,
  validateApiKeys
} from '../utils/apiHelpers';
import { LOADING_MESSAGES, IMAGE_WORKFLOW_STEPS, ACCEPTED_FORMATS, MAX_FILE_SIZE, ERROR_MESSAGES } from '../utils/constants';

const WorkflowImage = () => {
  const [step, setStep] = useState(IMAGE_WORKFLOW_STEPS.UPLOAD);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [generatedVariations, setGeneratedVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;


    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setError(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(ERROR_MESSAGES.IMAGE_TOO_LARGE);
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      setStatusMessage('Processing image...');

      
      const base64 = await fileToBase64(file);
      setUploadedImageBase64(base64);

  
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setStep(IMAGE_WORKFLOW_STEPS.ANALYZE);
        setStatusMessage('');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to process image');
      setStatusMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeImage = async () => {
    try {
      validateApiKeys();
      setIsLoading(true);
      setError(null);
      setStatusMessage(LOADING_MESSAGES.analyzing);

      const analysis = await analyzeImage(uploadedImageBase64);
      setAnalysisData(analysis);
      setStep(IMAGE_WORKFLOW_STEPS.GENERATE);
      setStatusMessage('');
    } catch (err) {
      setError(err.message);
      setStatusMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleGenerateVariations = async (count = 2) => {
    try {
      validateApiKeys();
      setIsLoading(true);
      setError(null);
      setStatusMessage(LOADING_MESSAGES.creating_variation);

      const variations = [];
      for (let i = 0; i < count; i++) {
        const variationUrl = await generateImageVariation(analysisData);
        variations.push(variationUrl);
      }

      setGeneratedVariations(variations);
      setStep(IMAGE_WORKFLOW_STEPS.COMPLETE);
      setStatusMessage('');
    } catch (err) {
      setError(err.message);
      setStatusMessage('');
    } finally {
      setIsLoading(false);
    }
  };


  const handleReset = () => {
    setStep(IMAGE_WORKFLOW_STEPS.UPLOAD);
    setUploadedImage(null);
    setUploadedImageBase64(null);
    setAnalysisData(null);
    setGeneratedVariations([]);
    setError(null);
    setStatusMessage('');
  };


  const handleRegenerateVariations = async () => {
    setGeneratedVariations([]);
    await handleGenerateVariations(2);
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

      {step === IMAGE_WORKFLOW_STEPS.UPLOAD && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Style Lab</h2>
            <p className="text-gray-600">Upload an image and we'll analyze its style to create variations</p>
          </div>

          <div className="flex justify-center">
            <label className="w-full max-w-md">
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-50 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-indigo-500 mb-2" />
                  <p className="mb-2 text-sm text-gray-700 font-semibold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPEG or WEBP (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={ACCEPTED_FORMATS.join(',')}
                  className="hidden"
                  disabled={isLoading}
                />
              </div>
            </label>
          </div>
        </div>
      )}

     
      {step === IMAGE_WORKFLOW_STEPS.ANALYZE && uploadedImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-square bg-gray-100 overflow-auto">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">Your Image</h3>
              <button
                onClick={() => setStep(IMAGE_WORKFLOW_STEPS.UPLOAD)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                Upload Different Image
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Ready to Analyze?</h3>
            <p className="text-gray-600 mb-4">
              Click the button below to analyze this image. We'll detect:
            </p>
            <ul className="space-y-2 mb-8 text-gray-700">
              <li className="flex gap-2">
                <span className="text-indigo-500">✓</span> Main subjects and objects
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500">✓</span> Color palette
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500">✓</span> Artistic style
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500">✓</span> Lighting and mood
              </li>
            </ul>
            <button
              onClick={handleAnalyzeImage}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Analyze Image
            </button>
          </div>
        </div>
      )}
      {step === IMAGE_WORKFLOW_STEPS.GENERATE && analysisData && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Image Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Main Objects</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(analysisData.mainObjects) && analysisData.mainObjects.length > 0 ? (
                    analysisData.mainObjects.map((obj, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {obj}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">{analysisData.mainObjects || 'Not detected'}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Artistic Style</h4>
                <p className="text-gray-700">{analysisData.artisticStyle}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Color Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(analysisData.colorPalette) && analysisData.colorPalette.length > 0 ? (
                    analysisData.colorPalette.map((color, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {color}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">{analysisData.colorPalette || 'Not detected'}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Lighting</h4>
                <p className="text-gray-700">{analysisData.lighting}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep(IMAGE_WORKFLOW_STEPS.UPLOAD)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
            >
              Back
            </button>
            <button
              onClick={() => handleGenerateVariations(2)}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Generate Variations
            </button>
          </div>
        </div>
      )}
      {step === IMAGE_WORKFLOW_STEPS.COMPLETE && generatedVariations.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">Style Variations Created!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {generatedVariations.map((imageUrl, idx) => (
              <ImageCard
                key={idx}
                imageUrl={imageUrl}
                title={`Variation ${idx + 1}`}
                onRegenerate={handleRegenerateVariations}
                isLoading={isLoading}
              />
            ))}
          </div>
          <button
            onClick={handleReset}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Analyze Another Image
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkflowImage;
