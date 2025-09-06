"use client";
import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useRouter } from "next/navigation";

// Example payment data; replace with API data in future
const initialPayments = [
  {
    id: "PAY001",
    client: "Acme Corp",
    plan: "Pro Plan",
    amount: "$99",
    date: "2025-09-01",
    status: "Completed",
  },
  {
    id: "PAY002",
    client: "Beta Ltd",
    plan: "Basic Plan",
    amount: "$49",
    date: "2025-08-28",
    status: "Pending",
  },
  {
    id: "PAY003",
    client: "Gamma Inc",
    plan: "Enterprise Plan",
    amount: "Custom",
    date: "2025-08-15",
    status: "Cancelled",
  },
];

const PaymentHistoryPage = () => {
  const router = useRouter();
  const [payments] = useState(initialPayments);

  return (
    <div className="flex min-h-screen bg-[#eaf1fb]">
      <Sidebar role="admin" />
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
        <h1 className="text-2xl font-bold text-[#0047ab] mb-6">Payment History</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full border border-gray-200 text-center">
            <thead>
              <tr className="bg-[#0047ab] text-white">
                <th className="py-3 px-6 font-semibold">Payment ID</th>
                <th className="py-3 px-6 font-semibold">Client</th>
                <th className="py-3 px-6 font-semibold">Plan</th>
                <th className="py-3 px-6 font-semibold">Amount</th>
                <th className="py-3 px-6 font-semibold">Date</th>
                <th className="py-3 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={idx} className="border-b hover:bg-blue-50 transition-all">
                  <td className="py-3 px-6 align-middle">{payment.id}</td>
                  <td className="py-3 px-6 align-middle">{payment.client}</td>
                  <td className="py-3 px-6 align-middle">{payment.plan}</td>
                  <td className="py-3 px-6 align-middle">{payment.amount}</td>
                  <td className="py-3 px-6 align-middle">{payment.date}</td>
                  <td className="py-3 px-6 align-middle">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      payment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PaymentHistoryPage;
