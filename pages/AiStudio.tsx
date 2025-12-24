import React, { useState, useRef } from 'react';
import { editImage, generateVideo } from '../services/geminiService';

const AiStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'video'>('editor');
  
  // Image Editor State
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedResult, setEditedResult] = useState<string | null>(null);

  // Video Generator State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoImageFile, setVideoImageFile] = useState<File | null>(null);
  const [videoImagePreview, setVideoImagePreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  // Helpers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: File) => void, previewSetter: (s: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setter(file);
      const reader = new FileReader();
      reader.onloadend = () => previewSetter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  // Handlers
  const handleEditImage = async () => {
    if (!editImageFile || !editPrompt) return;
    setIsEditing(true);
    setEditedResult(null);
    try {
      const base64 = await getBase64(editImageFile);
      const result = await editImage(base64, editPrompt);
      setEditedResult(result);
    } catch (e) {
      console.error(e);
      alert("Something went wrong with the image editor.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt && !videoImageFile) {
        alert("Please provide a prompt or an image.");
        return;
    }
    
    // Check API Key for Veo
    // Using (window as any) to access aistudio to avoid type conflicts with global definitions
    const aistudio = (window as any).aistudio;
    if (aistudio && aistudio.hasSelectedApiKey) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await aistudio.openSelectKey();
            // Proceed assuming key selection was successful as per instructions
        }
    }

    setIsGeneratingVideo(true);
    setGeneratedVideoUrl(null);
    try {
      let base64Image = undefined;
      if (videoImageFile) {
          base64Image = await getBase64(videoImageFile);
      }
      
      const resultUrl = await generateVideo(videoPrompt, aspectRatio, base64Image);
      setGeneratedVideoUrl(resultUrl);
    } catch (e) {
      console.error(e);
      alert("Video generation failed. Please try again.");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">Valvaire Creative Lab</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore the intersection of fashion and artificial intelligence. Design your own looks or visualize products in motion.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-8 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
            activeTab === 'editor' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Image Editor
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-8 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
            activeTab === 'video' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Video Studio (Veo)
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8 min-h-[500px]">
        
        {/* === IMAGE EDITOR === */}
        {activeTab === 'editor' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input */}
              <div className="space-y-4">
                <label className="block text-sm font-bold uppercase text-gray-700">1. Upload Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center hover:bg-gray-50 transition-colors relative cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setEditImageFile, setEditPreview)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {editPreview ? (
                    <img src={editPreview} alt="Preview" className="max-h-48 mx-auto object-contain" />
                  ) : (
                    <div className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Click to upload an image</span>
                    </div>
                  )}
                </div>

                <label className="block text-sm font-bold uppercase text-gray-700 mt-6">2. Describe Edit</label>
                <textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="e.g., 'Make the jacket red' or 'Add a neon futuristic background'"
                  className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black h-24 resize-none"
                />

                <button
                  onClick={handleEditImage}
                  disabled={isEditing || !editImageFile || !editPrompt}
                  className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? 'Designing...' : 'Generate New Look'}
                </button>
              </div>

              {/* Output */}
              <div className="bg-gray-50 rounded-sm border border-gray-100 flex items-center justify-center relative min-h-[300px]">
                {isEditing ? (
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm">AI is reimagining your image...</p>
                  </div>
                ) : editedResult ? (
                  <img src={editedResult} alt="Edited Result" className="w-full h-full object-contain" />
                ) : (
                  <p className="text-gray-400 text-sm">Result will appear here</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* === VIDEO GENERATOR (VEO) === */}
        {activeTab === 'video' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-blue-50 p-4 rounded-sm text-sm text-blue-800 mb-6">
                 <strong>Note:</strong> Video generation uses <strong>Veo</strong>. It may take a minute or two to process. Please be patient.
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="block text-sm font-bold uppercase text-gray-700">1. Source (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center hover:bg-gray-50 transition-colors relative cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setVideoImageFile, setVideoImagePreview)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {videoImagePreview ? (
                        <div className="relative h-32">
                           <img src={videoImagePreview} alt="Preview" className="h-full w-full object-contain" />
                           <button onClick={(e) => {e.preventDefault(); setVideoImageFile(null); setVideoImagePreview(null);}} className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded">X</button>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-xs py-4">Upload an image to animate (Optional)</p>
                    )}
                  </div>

                  <label className="block text-sm font-bold uppercase text-gray-700 mt-4">2. Video Prompt</label>
                  <textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="e.g., 'Cinematic slow motion of fabric flowing in the wind'"
                    className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black h-24 resize-none"
                  />

                  <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" checked={aspectRatio === '16:9'} onChange={() => setAspectRatio('16:9')} className="text-black focus:ring-black" />
                          <span className="text-sm">Landscape (16:9)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" checked={aspectRatio === '9:16'} onChange={() => setAspectRatio('9:16')} className="text-black focus:ring-black" />
                          <span className="text-sm">Portrait (9:16)</span>
                      </label>
                  </div>

                  <button
                    onClick={handleGenerateVideo}
                    disabled={isGeneratingVideo || (!videoPrompt && !videoImageFile)}
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingVideo ? 'Creating Magic...' : 'Generate Video'}
                  </button>
               </div>

               <div className="bg-black rounded-sm flex items-center justify-center relative min-h-[300px] overflow-hidden">
                 {isGeneratingVideo ? (
                    <div className="text-center text-white px-8">
                       <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                       <h3 className="text-lg font-bold mb-2">Generating Video...</h3>
                       <p className="text-gray-400 text-sm">This may take a few moments. We are using the Veo model to create high-quality motion.</p>
                    </div>
                 ) : generatedVideoUrl ? (
                    <video controls autoPlay loop className="w-full h-full object-contain">
                        <source src={generatedVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                 ) : (
                    <div className="text-center">
                        <span className="text-4xl mb-4 block">🎬</span>
                        <p className="text-gray-500 text-sm">Video preview will appear here</p>
                    </div>
                 )}
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudio;