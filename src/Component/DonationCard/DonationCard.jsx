import React from "react";

const DonationCard = ({ donation }) => {
  const { image, title, type, location, name, status, quantity, _id } =
    donation || "";

  const statusColor = {
    Available: "text-green-600",
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
          <strong>Status:</strong> {status}
        </p>

        <div className="pt-3 flex justify-end">
          <button
            className="bg-secondary hover:bg-yellow-400 text-primary font-semibold py-1.5 px-4 rounded-md "
            onClick={() => console.log("View details for:", _id)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
