import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUsers,
  faLayerGroup,
  faCheckCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const ContentCourseInfoCreator = ({
  author,
  nickname,
  desc,
  viewCount,
  level,
  purchaseCount,
  title,
}) => {
  return (
    <div className="bg-[#161b22]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <div className="flex space-x-8 border-b border-white/5 mb-8">
        <button className="pb-4 text-purple-400 border-b-2 border-purple-400 font-semibold text-sm uppercase tracking-wider">
          Chi tiết khóa học
        </button>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold text-white bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent leading-tight">
            {title || "Chưa có tiêu đề khóa học"}
          </h2>

          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase">
              <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
              {level || "Mọi cấp độ"}
            </div>
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <FontAwesomeIcon
                icon={faEye}
                className="mr-2 text-purple-400/70"
              />
              {viewCount?.toLocaleString() || 0} lượt xem
            </div>
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <FontAwesomeIcon
                icon={faUsers}
                className="mr-2 text-purple-400/70"
              />
              {purchaseCount?.toLocaleString() || 0} học viên
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <p className="text-gray-300 leading-relaxed text-lg italic font-light pl-2">
            "
            {desc ||
              "Khóa học này chưa được cập nhật mô tả chi tiết từ giảng viên."}
            "
          </p>
        </div>

        <div className="flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 group">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={author || "https://i.pravatar.cc/150?u=default"}
                alt={nickname}
                className="w-16 h-16 rounded-2xl border-2 border-purple-500/20 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#0d1117] rounded-full"></div>
            </div>
            <div>
              <p className="text-[10px] text-purple-400 font-black uppercase tracking-[0.2em] mb-1">
                Giảng viên chuyên gia
              </p>
              <h4 className="text-white font-bold text-xl flex items-center">
                {nickname || "Instructor"}
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="ml-2 text-blue-400 text-sm"
                />
              </h4>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-purple-500 hover:text-white transition-all duration-300 active:scale-95 shadow-xl shadow-white/5">
            <FontAwesomeIcon icon={faUserPlus} />
            Theo dõi
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-linear-to-br from-white/5 to-transparent border border-white/5 hover:bg-white/10 transition-colors">
            <h5 className="text-white font-bold mb-2 flex items-center uppercase text-xs tracking-wider">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              Lộ trình học tập
            </h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hệ thống bài giảng được sắp xếp logic từ cơ bản đến nâng cao.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-linear-to-br from-white/5 to-transparent border border-white/5 hover:bg-white/10 transition-colors">
            <h5 className="text-white font-bold mb-2 flex items-center uppercase text-xs tracking-wider">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              Đặc quyền học viên
            </h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Truy cập kho tài nguyên độc quyền và nhận hỗ trợ từ Mentor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCourseInfoCreator;
