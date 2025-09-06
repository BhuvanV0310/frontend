"use client";
import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useRouter } from "next/navigation";

// Example review data; replace with API data in future
const initialReviews = [
  { id: 1, branch: "Main Branch", rating: 1, text: "Very poor service, not recommended." },
  { id: 2, branch: "West Branch", rating: 2, text: "Staff was rude and unhelpful." },
  { id: 3, branch: "Main Branch", rating: 1, text: "Dirty environment and slow response." },
  { id: 4, branch: "East Branch", rating: 2, text: "Long wait times, not satisfied." },
  { id: 5, branch: "West Branch", rating: 1, text: "Worst experience ever." },
  // ...add up to 20 for demo
];

const TopWorstReviewsPage = () => {
  const router = useRouter();
  const [reviews] = useState(initialReviews);

  return (
    <div className="flex min-h-screen bg-[#eaf1fb]">
      <Sidebar role="user" />
      <main className="flex-1 p-10">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded shadow hover:bg-gray-100 text-[#0047ab] font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-[#0047ab] mb-6">Top 20 Worst Reviews</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <table className="min-w-full border border-gray-200 text-left">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="py-3 px-6 font-semibold">Branch</th>
                <th className="py-3 px-6 font-semibold">Rating</th>
                <th className="py-3 px-6 font-semibold">Review</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={review.id} className="border-b hover:bg-red-50 transition-all">
                  <td className="py-3 px-6 align-middle font-semibold text-[#0047ab]">{review.branch}</td>
                  <td className="py-3 px-6 align-middle">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">{review.rating}</span>
                  </td>
                  <td className="py-3 px-6 align-middle text-gray-700">{review.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TopWorstReviewsPage;
