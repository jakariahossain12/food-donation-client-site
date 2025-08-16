import React from "react";
import { Link } from "react-router";

const DonationCard = ({ donation }) => {
  const {
    image,
    title,
    type,
    location,
    name,
    status,
    pickupStart,
    pickupEnd,
    quantity,
    _id,
  } = donation || "";

  const statusColor = {
    Verified: "text-green-600",
    Requested: "text-yellow-500",
    "Picked Up": "text-gray-500",
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-[#00705c] line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-base-content">
          <strong>food type:</strong> {type}
        </p>

        <p className="text-sm text-base-content">
          <strong>Restaurant:</strong> {name}
        </p>

        <p className="text-sm text-base-content">
          <strong>Quantity:</strong> {quantity}
        </p>
        <p className="text-sm text-base-content">
          <strong>location:</strong> {location}
        </p>

        <p
          className={`text-sm font-medium ${
            statusColor[status] || "text-gray-700"
          }`}
        >
          <strong className="text-base-content">Status:</strong> {status}
        </p>

        <div className="pt-3 flex justify-end">
          <Link to={`/donations-details/${_id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-1.5 px-4 rounded-md">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
