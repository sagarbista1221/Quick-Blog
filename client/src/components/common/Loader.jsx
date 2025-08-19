import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary border-solid" />
    </div>
  );
};

export default Loader;
