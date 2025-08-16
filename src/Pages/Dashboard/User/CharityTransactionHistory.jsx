import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../../Component/Loading/Loading";



const CharityTransactionHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    error,
    refetch,
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

  refetch();
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
            <tbody className="divide-y divide-gray-200 bg-base-200">
              <tr className="hover:bg-base-100 transition">
                <td className="px-6 py-4 font-mono text-sm text-base-content">
                  {transactionData.transactionId}
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ${transactionData.amount}
                </td>
                <td className="px-6 py-4 text-base-content">
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
