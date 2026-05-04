import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faGear,
  faCircleCheck,
  faCircle,
  faLock,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ContentCourseInfoCreator from "@/components/ui/contents/ContentCourseInfoCreator";
import ContentPanel from "@/components/ui/contents/ContentPanel";
import { data, useParams } from "react-router-dom";
import { useGetCourseDetail } from "./../../hooks/useGetCourseDetail";
import Loading from "@/components/ui/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "@/store/blocksSlice";
import { useGetBlockDetail } from "@/hooks/useGetBlockDetail";
import { formatYoutubeLink } from "@/utils/systems/sysFuc";

const ContentDetail = () => {
  const { contentId } = useParams();
  const { data, isLoading } = useGetCourseDetail(contentId);
  const dispatch = useDispatch();
  const infoCourseDetail = data?.data?.data;

  useEffect(() => {
    if (infoCourseDetail) {
      dispatch(getDetailCourse(infoCourseDetail));
    }
  }, [infoCourseDetail]);

  const { type, title, idBlock } = useSelector((state) => state.blockActive);
  const { data: blockDetail, refetch } = useGetBlockDetail(contentId, idBlock);
  let blockInstance = blockDetail?.data?.data;
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-300 font-sans p-6">
      {/* Header */}

      <main className="max-w-7xl mx-auto">
        {/* Left Column: Video & Info */}
        <div className=" grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Breadcrumb */}

            {/* Title */}
            <h1 className="text-3xl font-bold text-white">{title}</h1>

            {/* Video Block Container - Giữ tỷ lệ khung hình cố định */}
            <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group">
              {type == "LINK_BLOCK" ? (
                <iframe
                  className="w-full h-full"
                  src={formatYoutubeLink(blockInstance?.textContent)}
                  title="Lesson Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                /* TRƯỜNG HỢP 2: LINK TRỐNG - HIỆN TEXT NHƯNG GIỮ KHUNG */
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a]">
                  {/* Vùng decor placeholder */}
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4 animate-pulse">
                    <div className="w-8 h-8 border-2 border-dashed border-gray-600 rounded-full"></div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-gray-300 font-medium tracking-wide">
                      Nội dung học
                    </p>
                    <p className="text-gray-600 text-xs px-10">
                      {blockInstance?.textContent}
                    </p>
                  </div>

                  {/* Giữ nguyên cái deco nhỏ góc dưới để layout không bị trống trải */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[10px] text-gray-600">
                    <div className="w-1 h-4 bg-gray-800"></div>
                    <span className="uppercase tracking-widest">
                      Status: Offline
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isLoading && <ContentPanel />}
        </div>
        <div className="mt-8">
          <ContentCourseInfoCreator
            author={infoCourseDetail.urlAvatarAuthor}
            nickname={infoCourseDetail.nickname}
            desc={infoCourseDetail.description}
            viewCount={infoCourseDetail.viewCount}
            level={infoCourseDetail.level}
            purchaseCount={infoCourseDetail.purchaseCount}
            title={infoCourseDetail.title}
          />
        </div>
      </main>
    </div>
  );
};
export default ContentDetail;
