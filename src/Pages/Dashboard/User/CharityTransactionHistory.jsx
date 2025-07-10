import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../../Component/Loading/Loading";

// const transactionData = null; // or use [] if you're expecting an array

// const transactionData = {
//   _id: "686ee173e677adadf52b95f5",
//   email: "kemicymu@mailinator.com",
//   name: "Jolene Peck",
//   organization: "Hurst Sosa Inc",
//   mission: "Aliquip labore digni",
//   status: "Pending",
//   date: "2025-07-09T21:38:40.231Z",
//   amount: 2500,
//   currency: "usd",
//   transactionId: "pi_3Rix7DKHEkXvw65F0WUQvGMi",
//   paymentMethod: "pm_1Rix7CKHEkXvw65F2Zy1gTPv",
//   created: 1752064127,
// };

const CharityTransactionHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    error,
    data: transactionData,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity-request-status?email=${user?.email}`
      );

      return res.data;
    },
  });

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center text-[#00705c] mb-6">
        Charity Role Transaction History
      </h2>

      {!transactionData ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-6 rounded-md text-center">
          <p className="text-lg font-medium">No transactions found.</p>
          <p className="text-sm mt-2">
            You haven’t made any charity role payment requests yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-[#00705c] text-white">
              <tr>
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Request Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-mono text-sm text-gray-700">
                  {transactionData.transactionId}
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ${transactionData.amount}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(transactionData.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      transactionData.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : transactionData.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transactionData.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CharityTransactionHistory;
