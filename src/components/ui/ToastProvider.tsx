"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="dark"
      toastClassName="!rounded-lg !border !border-[var(--border)] !bg-[var(--surface)] !text-[var(--text)]"
      progressClassName="!bg-[var(--blue)]"
    />
  );
};

export default ToastProvider;
