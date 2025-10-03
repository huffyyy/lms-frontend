import React, { useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "../../../services/courseService";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, courseName, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div
        className="bg-white rounded-xl shadow-lg p-8 w-[350px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title" className="font-bold text-2xl mb-2 text-black">
          Delete Course
        </h2>
        <p className="text-center text-[#838C9D] mb-6 text-sm">
          Are you sure you want to delete <span className="font-semibold">{courseName}</span>?
          <br />
          <span className="text-red-500 text-xs mt-1">This action cannot be undone.</span>
        </p>
        <div className="flex gap-4 w-full">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-2 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            onClick={onClose}
            disabled={isLoading}>
            Cancel
          </button>
          <button
            type="button"
            className="w-full rounded-full p-2 bg-[#FF435A] font-semibold text-white hover:bg-[#E63950] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default function CardCourse({
  id,
  imageUrl = "/assets/images/thumbnails/th-1.png",
  name = "Untitled Course",
  totalStudents = 0,
  category = "Uncategorized"
}) {
  const revalidator = useRevalidator();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteCourse(id),
    onError: (err) => {
      setError(err.message || "Failed to delete course");
      console.error("Delete course error:", err);
    }
  });

  const handleDeleteClick = () => {
    setError(null);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await mutateAsync();
      setShowConfirm(false);
      revalidator.revalidate();
    } catch {
      setShowConfirm(false);
    }
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      setShowConfirm(false);
      setError(null);
    }
  };

  return (
    <>
      <div className="card flex items-center gap-5">
        <div className="flex shrink-0 w-[140px] h-[110px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img src={imageUrl} className="w-full h-full object-cover" alt={`${name} thumbnail`} loading="lazy" />
        </div>

        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1" title={name}>
            {name}
          </h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img src="/assets/images/icons/profile-2user-purple.svg" className="w-5 h-5" alt="" aria-hidden="true" />
              <p className="text-[#838C9D]">{totalStudents} Students</p>
            </div>
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img src="/assets/images/icons/crown-purple.svg" className="w-5 h-5" alt="" aria-hidden="true" />
              <p className="text-[#838C9D]">{category}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="w-fit rounded-full bg-[#FF435A] text-white p-[14px_20px] font-semibold text-nowrap hover:bg-[#E63950] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Delete ${name} course`}>
            Delete
          </button>

          <Link
            to={`/manager/courses/${id}`}
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap hover:bg-gray-50 transition-colors"
            aria-label={`Manage ${name} course`}>
            Manage
          </Link>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        courseName={name}
        isLoading={isLoading}
      />
    </>
  );
}

CardCourse.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  totalStudents: PropTypes.number,
  category: PropTypes.string
};
