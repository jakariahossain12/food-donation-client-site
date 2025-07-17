// your custom hook
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PymentElements from "./PymentElements";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Component/Loading/Loading";
import { toast } from "react-toastify";

const RequestCharityRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [hasRequest, setHasRequest] = useState(false);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [roleRequestData, setRoleRequestData] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check for existing role request

  const {
    isLoading,
    error,
    data: payment,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity-request-status?email=${user?.email}`
      );
      if (res?.data?.status === "Pending" || res?.data?.status === "Approved") {
        setHasRequest(true);
      }
      return res.data;
    },
  });

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  if (error) {
    toast.error(error.message);
  }

  const onSubmit = async (data) => {
    // Save role request
    const roleRequest = {
      email: user?.email,
      name: user?.displayName,
      image: user?.photoURL,
      organization: data.organization,
      mission: data.mission,
      status: "Pending",
      date: new Date(),
    };
    setRoleRequestData(roleRequest);
    setIsModelOpen(true);
  };

  if (hasRequest) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20 p-4">
        <h2 className="text-xl font-semibold text-[#00705c]">
          You already have a {payment?.status} charity role request.
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
        >
          Pay & Request Role
        </button>
      </form>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {isModalOpen && (
        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Pay for Charity </h3>
            <PymentElements roleRequestData={roleRequestData}></PymentElements>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => setIsModelOpen(false)} className="btn">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestCharityRole;
