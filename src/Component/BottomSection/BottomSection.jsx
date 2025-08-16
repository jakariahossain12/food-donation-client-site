import React from "react";

const BottomSection = () => {
  return (
    <div>
      {/* Bottom Feature Row */}
      <div className="my-20 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-10 text-center">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4203/4203842.png"
            alt="Volunteer"
            className="mx-auto w-12 h-12 mb-2"
          />
          <h3 className="text-lg font-semibold">Become a Volunteer</h3>
          <p className="text-sm text-gray-600">
            We help companies develop powerful corporate social responsibility
          </p>
        </div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2784/2784482.png"
            alt="Fundraise"
            className="mx-auto w-12 h-12 mb-2"
          />
          <h3 className="text-lg font-semibold">Quick Fundraise</h3>
          <p className="text-sm text-gray-600">
            We help companies develop powerful corporate social responsibility
          </p>
        </div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1995/1995574.png"
            alt="Start Donating"
            className="mx-auto w-12 h-12 mb-2"
          />
          <h3 className="text-lg font-semibold">Start Donating</h3>
          <p className="text-sm text-gray-600">
            We help companies develop powerful corporate social responsibility
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
