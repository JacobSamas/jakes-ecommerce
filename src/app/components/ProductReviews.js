'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

export default function ProductReviews({ reviews, setReviews }) {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    comment: '',
    media: [],
  });

  const handleStarClick = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + reviewForm.media.length > 5) {
      toast.error('You can upload a maximum of 5 files!', { theme: 'dark' });
      return;
    }
    setReviewForm({ ...reviewForm, media: [...reviewForm.media, ...files] });
  };

  const removeMedia = (indexToRemove) => {
    setReviewForm({
      ...reviewForm,
      media: reviewForm.media.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewForm.name || !reviewForm.rating || !reviewForm.comment) {
      toast.error('Please fill out all fields!', { theme: 'dark' });
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      ...reviewForm,
    };

    setReviews([newReview, ...reviews]);
    toast.success('Review submitted successfully!', { theme: 'dark' });

    setReviewForm({ name: '', rating: 0, comment: '', media: [] });
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-lightGray mb-8">Customer Reviews</h2>

      {/* Write a Review */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-lightGray mb-4">Write a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-lightGray mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-darkBlack text-lightGray border border-gray-700 focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-lightGray mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none"
                >
                  {reviewForm.rating >= star ? (
                    <AiFillStar className="text-teal" size={24} />
                  ) : (
                    <AiOutlineStar className="text-gray-500" size={24} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-lightGray mb-2">Comment</label>
            <textarea
              placeholder="Your review"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-darkBlack text-lightGray border border-gray-700 focus:border-teal focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-lightGray mb-2">
              Upload Images or Videos (Max: 5)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="inline-block px-4 py-2 bg-teal text-darkBlack font-bold rounded-md cursor-pointer hover:bg-green transition"
            >
              Upload Media
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              {reviewForm.media.map((file, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 overflow-hidden rounded-md bg-gray-300"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="uploaded media"
                    layout="fill"
                    objectFit="cover"
                  />
                  <button
                    onClick={() => removeMedia(index)}
                    className="absolute top-1 right-1 bg-darkBlack text-white p-1 rounded-full hover:bg-teal transition"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-teal text-darkBlack font-bold px-4 py-2 rounded-md hover:bg-green transition"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Existing Reviews */}
      <div className="mt-16 space-y-6">
        <h3 className="text-lg font-bold text-lightGray mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-lightGray text-darkBlack rounded-lg shadow-md p-4"
            >
              <p className="font-bold text-teal">{review.name}</p>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {review.rating >= star ? (
                      <AiFillStar className="text-teal" size={16} />
                    ) : (
                      <AiOutlineStar className="text-gray-500" size={16} />
                    )}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-darkBlack">{review.comment}</p>
              {review.media.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {review.media.map((file, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 overflow-hidden rounded-md bg-gray-300"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="review media"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-lightGray">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
