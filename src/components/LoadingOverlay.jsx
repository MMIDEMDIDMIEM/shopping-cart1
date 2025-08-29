import React from "react";

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null; // لو مش شغال متظهرش خالص

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[9999]">
      <span className="loading loading-infinity loading-lg text-white"></span>
      <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default LoadingOverlay;
