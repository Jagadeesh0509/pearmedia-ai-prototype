import React from 'react';
import { Download, Zap } from 'lucide-react';

const ImageCard = ({ imageUrl, title, onDownload, onRegenerate, isLoading }) => {
  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative w-full aspect-square bg-gradient-to-br from-indigo-50 to-violet-50 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin mb-4">
                <Zap className="w-12 h-12 text-indigo-400" />
              </div>
              <p className="text-gray-400">Generating...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={downloadImage}
            disabled={!imageUrl || isLoading}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white font-medium py-2 rounded-lg transition"
          >
            <Download size={18} />
            Download
          </button>
          <button
            onClick={onRegenerate}
            disabled={!imageUrl || isLoading}
            className="flex-1 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-300 text-white font-medium py-2 rounded-lg transition"
          >
            <Zap size={18} />
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
