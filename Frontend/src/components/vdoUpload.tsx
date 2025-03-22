import React, { useState } from 'react';
import { Upload, X, Pencil, Trash2 } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  url: string;
  uploadDate: string;
}

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Pregnancy Nutrition Guide',
    url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', // Replace with actual YouTube URL
    uploadDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'Exercise During Pregnancy',
    url: 'https://www.youtube.com/watch?v=YYYYYYYYYYY', // Replace with actual YouTube URL
    uploadDate: '2024-03-14'
  },
  {
    id: '3',
    title: 'Mental Health for New Mothers',
    url: 'https://www.youtube.com/watch?v=ZZZZZZZZZZZ', // Replace with actual YouTube URL
    uploadDate: '2024-03-13'
  }
];

export function VdoUpload() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState<Video[]>(sampleVideos);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingVideo) {
      // Update existing video
      setVideos(videos.map(video =>
        video.id === editingVideo.id
          ? { ...video, title, url }
          : video
      ));
      setEditingVideo(null);
    } else {
      // Add new video
      const newVideo: Video = {
        id: Date.now().toString(),
        title,
        url,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setVideos([newVideo, ...videos]);
    }

    // Reset form
    setTitle('');
    setUrl('');
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setTitle(video.title);
    setUrl(video.url);
  };

  const handleDelete = (videoId: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(video => video.id !== videoId));
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">
          {editingVideo ? 'Edit Video' : 'Upload Video Link'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Video URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Video URL (YouTube or any other)
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter YouTube or other video URL"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            {editingVideo && (
              <button
                type="button"
                onClick={() => {
                  setEditingVideo(null);
                  setTitle('');
                  setUrl('');
                }}
                className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingVideo ? 'Update Video' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>

      {/* Videos List */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">Uploaded Videos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{video.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{video.url}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{video.uploadDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEdit(video)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
