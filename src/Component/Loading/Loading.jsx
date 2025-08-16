import React from 'react';


const Loading = () => {
    return (
      <div className="flex justify-center items-center text-[#00705c]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-Primary"></div>
      </div>
    );
};

export default Loading;