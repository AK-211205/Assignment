// components/ToastNotify.js

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ToastNotify Component
const ToastNotify = () => {
  // Function to show success toast
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  // Function to show error toast
  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  // Return ToastContainer, which will display the toasts globally
  return (
    <>
      {/* ToastContainer renders all toasts */}
      <ToastContainer />
    </>
  );
};

// Export showSuccessToast and showErrorToast as named exports
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

export default ToastNotify;
    