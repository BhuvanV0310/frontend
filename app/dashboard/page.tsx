"use client";
import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Sidebar from "../components/layout/sidebar";
import { useRouter } from "next/navigation";

function getRoleFromJWT(token: string): "admin" | "user" | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "admin" ? "admin" : "user";
  } catch {
    return null;
  }
}

const DashboardPage = () => {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    if (!jwt) {
      router.replace("/auth/login");
      return;
    }
    const userRole = getRoleFromJWT(jwt);
    if (!userRole) {
      router.replace("/auth/login");
      return;
    }
    setRole(userRole);
  }, [router]);

  if (!role) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-[#eaf1fb]">
      <Sidebar role={role} />
      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-extrabold text-[#0047ab] mb-2">Company Analysis Report</h1>
          <p className="text-lg text-gray-700 mb-4">Comprehensive sentiment analysis and insights for business performance.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="bg-[#f5faff] rounded-lg p-4 text-center">
              <h2 className="text-xl font-bold text-[#0047ab] mb-1">Overall Sentiment</h2>
              <p className="text-2xl font-semibold text-green-600">Positive</p>
              <p className="text-sm text-gray-500">Majority of feedback is positive</p>
            </div>
            <div className="bg-[#f5faff] rounded-lg p-4 text-center">
              <h2 className="text-xl font-bold text-[#0047ab] mb-1">Negative Feedback</h2>
              <p className="text-2xl font-semibold text-red-500">9.6%</p>
              <p className="text-sm text-gray-500">Areas for improvement identified</p>
            </div>
            <div className="bg-[#f5faff] rounded-lg p-4 text-center">
              <h2 className="text-xl font-bold text-[#0047ab] mb-1">Neutral Feedback</h2>
              <p className="text-2xl font-semibold text-gray-600">3.4%</p>
              <p className="text-sm text-gray-500">Some feedback is neutral</p>
            </div>
          </div>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 text-[#0047ab]">Sentiment Distribution (Cleaned Text)</h2>
            <Zoom>
              <img src="/sentiment_distribution_cleaned.png" alt="Sentiment Distribution" className="max-w-full h-auto border border-gray-200 rounded cursor-pointer" />
            </Zoom>
            <p className="mt-2 text-sm text-gray-600 text-center">Shows the overall distribution of positive, negative, and neutral feedback.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 text-[#0047ab]">Sentiment by Category (Cleaned)</h2>
            <Zoom>
              <img src="/sentiment_by_category_cleaned.png" alt="Sentiment by Category" className="max-w-full h-auto border border-gray-200 rounded cursor-pointer" />
            </Zoom>
            <p className="mt-2 text-sm text-gray-600 text-center">Breakdown of sentiment across different business categories.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 text-[#0047ab]">Sentiment by Rating (Cleaned)</h2>
            <Zoom>
              <img src="/sentiment_by_rating_cleaned.png" alt="Sentiment by Rating" className="max-w-full h-auto border border-gray-200 rounded cursor-pointer" />
            </Zoom>
            <p className="mt-2 text-sm text-gray-600 text-center">Sentiment analysis based on customer ratings.</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mt-10">
          <div className="mb-8">
            <a href="/reviews/worst" className="block">
              <div className="bg-red-100 border-l-4 border-red-500 rounded-lg p-6 flex items-center gap-4 hover:shadow-lg hover:bg-red-200 transition-all">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-1.414 1.414A9 9 0 105.636 18.364l1.414-1.414A7 7 0 1116.95 7.05z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-red-700 mb-1">Top 20 Worst Reviews</h3>
                  <p className="text-sm text-red-700">See the most frequent negative feedback and take action.</p>
                </div>
              </div>
            </a>
          </div>
          <h2 className="text-2xl font-bold text-[#0047ab] mb-4">Key Insights & Recommendations</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Leverage positive feedback to strengthen brand reputation.</li>
            <li>Address negative feedback to improve customer satisfaction.</li>
            <li>Monitor neutral feedback for potential opportunities.</li>
            <li>Focus on categories and ratings with lower sentiment scores.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;