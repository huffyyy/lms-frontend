import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useRevalidator } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteDetailContent } from "../../../services/courseService";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, contentTitle, isLoading }) => {
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
          Delete Content
        </h2>
        <p className="text-center text-[#838C9D] mb-6 text-sm">
          Are you sure you want to delete <span className="font-semibold">{contentTitle}</span>?
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
  contentTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default function ContentItem({ id, index, type, title, courseId }) {
  const revalidator = useRevalidator();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteDetailContent(id),
    onSuccess: () => {
      revalidator.revalidate();
    },
    onError: (err) => {
      setError(err.message || "Failed to delete content");
      console.error("Delete content error:", err);
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
        <div className="relative flex shrink-0 w-[140px] h-[110px]">
          <p className="absolute -top-[10px] -left-[10px] flex shrink-0 w-[30px] h-[30px] rounded-full items-center justify-center text-center bg-[#662FFF] text-white">
            <span className="font-bold text-sm leading-[21px]">{index}</span>
          </p>
          <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
            <img src={`/assets/images/thumbnails/cover-${type}.png`} className="w-full h-full object-cover" alt="thumbnail" />
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{title}</h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img
                src={`/assets/images/icons/${type === "text" ? "note-favorite-purple.svg" : "video-play-purple.svg"}`}
                className="w-5 h-5"
                alt="icon"
              />
              <p className="text-[#838C9D]">{type} Content</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Link
            to={`/manager/courses/${courseId}/edit/${id}`}
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap hover:bg-gray-50 transition-colors">
            Edit Content
          </Link>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap hover:bg-[#E63950] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Delete
          </button>
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
        contentTitle={title}
        isLoading={isLoading}
      />
    </>
  );
}

ContentItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired
};
