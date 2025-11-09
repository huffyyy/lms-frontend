import React from "react";
import PropTypes from "prop-types";

export default function ContentVideo({ content, handleNext }) {
  const youtubeId = content?.youtubeId;

  return (
    <>
      <div className="flex shrink-0 h-[calc(100vh-110px-104px)] rounded-[20px] overflow-hidden">
        {youtubeId ? (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${youtubeId}?si=IGeRBup7jYeDxLxr`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">Video tidak tersedia</div>
        )}
      </div>
      <div className="flex items-center justify-between gap-5">
        <h1 className="font-bold text-[32px] leading-[48px]">{content?.title}</h1>
        <button
          type="button"
          onClick={() => handleNext(content)}
          className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#1E40AF] text-nowrap">
          Mark as Completed
        </button>
      </div>
    </>
  );
}

ContentVideo.propTypes = {
  content: PropTypes.shape({
    youtubeId: PropTypes.string,
    title: PropTypes.string,
    handleNext: PropTypes.func
  })
};
