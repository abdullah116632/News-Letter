'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const dummyReviews = [
  {
    id: 1,
    name: 'Alice Johnson',
    message:
      'This platform is amazing! It helped me get my newsletter out easily and professionally.',
  },
  {
    id: 2,
    name: 'Mark Wilson',
    message:
      'I really appreciate the UI/UX of the dashboard. Super intuitive and clean!',
  },
  {
    id: 3,
    name: 'Jane Smith',
    message:
      'Great features! I especially liked the analytics section for tracking engagement.',
  },
];


const ReviewList = () => {

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log('Delete review with id:', id);
  };



  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-400">User Reviews</h2>

      <div className="space-y-6">
        {dummyReviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-900 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start"
          >
            {/* Reviewer Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-blue-400">
                {review.name}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-4">
                {review.message}
              </p>
            </div>

            {/* Action */}
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => handleDelete(review.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
