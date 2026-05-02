import React, { useEffect } from "react";
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

const ContentDetail = () => {
  const { contentId } = useParams();
  const { data, isLoading } = useGetCourseDetail(contentId);

  if (isLoading) {
    return <Loading />;
  }
  const infoCourseDetail = data?.data?.data;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-300 font-sans p-6">
      {/* Header */}

      <main className="max-w-7xl mx-auto">
        {/* Left Column: Video & Info */}
        <div className=" grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <nav className="text-xs text-gray-500 space-x-2">
              <span>Module 3: Advanced Components</span>
              <span>&gt;</span>
              <span className="text-gray-300">Lesson 4</span>
            </nav>

            <h1 className="text-3xl font-bold text-white">
              Building Glassmorphic UI Systems
            </h1>

            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[10px] text-gray-400">
                <div className="w-1 h-4 bg-cyan-400"></div>
                <span>Safe work properly work</span>
              </div>
            </div>
          </div>
          <ContentPanel />
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
