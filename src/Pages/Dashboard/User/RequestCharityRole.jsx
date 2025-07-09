// your custom hook

import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router";
import PymentElements from "./PymentElements";

const RequestCharityRole = () => {
  const { user } = useAuth();
  const [hasRequest, setHasRequest] = useState(false);
  const amount = 25;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Check for existing role request
  useEffect(() => {
    axios
      .get(`/api/charity-request-status?email=${user?.email}`)
      .then((res) => {
        if (res.data.status === "Pending" || res.data.status === "Approved") {
          setHasRequest(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?.email]);

  const onSubmit = async (data) => {
    try {
      // Create PaymentIntent from server

      // Save role request
      const roleRequest = {
        email: user.email,
        name: user.displayName,
        organization: data.organization,
        mission: data.mission,

        status: "Pending",
        date: new Date(),
      };
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    }
  };

  if (hasRequest) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20 p-4">
        <h2 className="text-xl font-semibold text-[#00705c]">
          You already have a pending or approved charity role request.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-[#00705c] mb-6 text-center">
        Request Charity Role
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Your Name</label>
          <input
            value={user?.displayName || ""}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Your Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Organization Name</label>
          <input
            {...register("organization", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Helping Hands Org"
          />
          {errors.organization && (
            <p className="text-red-500 text-sm">
              Organization name is required
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Mission Statement</label>
          <textarea
            {...register("mission", { required: true })}
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Share your mission..."
          />
          {errors.mission && (
            <p className="text-red-500 text-sm">
              Mission statement is required
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            Payment ($25)
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-[#00705c] hover:bg-[#005e4e] text-white py-2 rounded-md font-semibold"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <Link>Pay & Request Role</Link>
        </button>
      </form>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Pay for Charity </h3>
          <PymentElements></PymentElements>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestCharityRole;
