import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { Link } from "react-router";

const statusColors = {
  Verified: "text-green-600",
  Pending: "text-yellow-500",
  Rejected: "text-red-600",
};

const statusIcons = {
  Verified: <FaCheckCircle />,
  Pending: <FaHourglassHalf />,
  Rejected: <FaTimesCircle />,
};

const MyDonationCard = ({ donation, handleDelete }) => {
  const {
    _id,
    title,
    type,
    quantity,
    pickupStart,
    pickupEnd,
    name,
    email,
    location,
    image,
    status,
  } = donation;

  return (
    <div className="bg-base-200 rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5 space-y-1">
        <h2 className="text-xl font-bold text-[#00705c]">{title}</h2>
        <p className="text-sm text-base-content">
          <span className="font-medium">Type:</span> {type}
        </p>
        <p className="text-sm text-base-content">
          <span className="font-medium">Quantity:</span> {quantity}
        </p>
        <p className="text-sm text-base-content">
          <span className="font-medium">Pickup Time:</span> {pickupStart} -{" "}
          {pickupEnd}
        </p>
        <p className="text-sm text-base-content">
          <span className="font-medium">Restaurant:</span> {name}
        </p>
        <p className="text-sm text-base-content">
          <span className="font-medium">Email:</span> {email}
        </p>
        <p className="text-sm text-base-content">
          <span className="font-medium">Location:</span> {location}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span
            className={`${statusColors[status]} flex items-center gap-1 font-semibold`}
          >
            {statusIcons[status]} {status}
          </span>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          {status !== "Rejected" && (
            <Link
              to={`/dashboard/upDate-donations/${_id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md flex items-center gap-2"
            >
              <FaEdit />
              Update
            </Link>
          )}
          <button
            onClick={() => handleDelete(_id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md flex items-center gap-2"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyDonationCard;
