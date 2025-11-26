import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import Button from './Button';

const ImageUploader = ({ closeModal, multiple = true, onSubmit, uploading }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    setError('');
    setSuccessMessage('');
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    // Pass the FileList back to the caller so they can choose how to handle upload.
    onSubmit(selectedFiles);
  };

  return (
    <div className='max-w-lg relative mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
      <button
        onClick={closeModal}
        className='bg-none border-none p-1 rounded-sm translate-x-2 text-2xl transition-all duration-200 absolute top-1.5 text-gray-500 right-[1rem]'
      >
        <HiXMark />
      </button>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Upload Images</h2>

      {error && <p className='text-red-600 mb-4'>{error}</p>}
      {successMessage && <p className='text-green-600 mb-4'>{successMessage}</p>}

      <form onSubmit={handleUpload}>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Select Images:</label>
          <input
            type='file'
            multiple={multiple}
            onChange={handleFileChange}
            className='block w-full text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2'
          />
        </div>

        <Button size='md' loading={uploading} variant='secondary'>
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>
      </form>
    </div>
  );
};

export default ImageUploader;
