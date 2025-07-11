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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-[#00705c]">{title}</h2>
        <p className="text-sm text-gray-600">
          <strong>food type:</strong> {type}
        </p>

        <p className="text-sm text-gray-600">
          <strong>Restaurant:</strong> {name}
        </p>

        <p className="text-sm text-gray-600">
          <strong>Quantity:</strong> {quantity}
        </p>
        <p className="text-sm text-gray-600">
          <strong>location:</strong> {location}
        </p>

        <p
          className={`text-sm font-medium ${
            statusColor[status] || "text-gray-700"
          }`}
        >
          <strong className="text-gray-600">Status:</strong> {status}
        </p>

        <div className="pt-3 flex justify-end">
          <Link to={`/donations/${_id}`}>
            <button className="bg-secondary hover:bg-yellow-400 text-primary font-semibold py-1.5 px-4 rounded-md">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
