import React from "react";
import { Eye, ShoppingCart, Bookmark } from "lucide-react";
import notificationAntd from "@/utils/notifications/notificationAntd";
import defaultAvatar from "@images/defaultAvatar.png";
import { Link } from "react-router-dom";
import { useAddCart } from "@/hooks/useAddCart";

const ContentBlocks = ({ data }) => {
  const { mutate } = useAddCart();
  const handleAddCart = () => {
    mutate(data.id, {
      onSuccess: () => {
        notificationAntd(
          "success",
          "Thêm vào giỏ hàng",
          `Sản phẩm đã được thêm thành công!`,
        );
      },
    });
  };

  return (
    <div className="group relative flex flex-col h-full lg:max-w-87.5 rounded-2xl overflow-hidden font-sans transition-all duration-500 hover:-translate-y-1">
      {/* Gradient border wrapper */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/30 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

      {/* Main card */}
      <div className="relative flex flex-col h-full bg-gradient-to-br from-[#0f172a] via-[#0c1425] to-[#0a0f1f] text-white rounded-2xl overflow-hidden border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:border-white/10 group-hover:shadow-[0_12px_48px_rgba(56,189,248,0.15)] transition-all duration-500">
        {/* Thumbnail Area */}
        <div className="relative h-52 shrink-0 overflow-hidden">
          <img
            src={data.thumb}
            alt="Course"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
          {/* Top glow accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <span className="backdrop-blur-md bg-sky-500/10 text-sky-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-sky-400/30 shadow-lg">
              {data.level}
            </span>
            <span className="backdrop-blur-md bg-purple-500/10 text-purple-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-purple-400/30 shadow-lg">
              {data.categoryName}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 flex flex-col flex-1 relative">
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Title & Price */}
          <div className="flex justify-between items-start mb-3 gap-3 relative">
            <h2 className="text-lg font-bold leading-tight h-12 line-clamp-2 tracking-tight group-hover:text-sky-50 transition-colors">
              {data.title}
            </h2>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-500 text-lg font-extrabold shrink-0 whitespace-nowrap">
              {data.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400/90 text-sm mb-6 line-clamp-2 h-10 leading-relaxed relative">
            {data.description}
          </p>

          {/* Author Info */}
          <Link
            to={data.nickname ? `/user/${data.nickname}` : "#"}
            className={`flex items-center gap-3 mb-5 group/author relative ${
              !data.nickname ? "pointer-events-none cursor-default" : ""
            }`}
            onClick={(e) => !data.nickname && e.preventDefault()}
          >
            <div className="relative">
              {/* Avatar glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 opacity-0 group-hover/author:opacity-60 blur-md transition-opacity" />
              <img
                src={
                  data?.urlAvatarAuthor ? data?.urlAvatarAuthor : defaultAvatar
                }
                alt="Avatar"
                className="relative w-10 h-10 rounded-full border-2 border-white/10 object-cover group-hover/author:border-sky-400/50 transition-colors"
              />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium mb-0.5">
                Tác giả
              </p>
              <p className="text-sm font-semibold text-gray-200 group-hover/author:text-sky-300 transition-colors">
                {data?.nickname ? data.nickname : "On update"}
              </p>
            </div>
          </Link>

          {/* Footer Metrics */}
          <div className="flex justify-between items-center pt-4 mt-auto relative">
            {/* Divider with gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                <Eye size={15} className="opacity-70" />
                <span className="font-medium tabular-nums">
                  {data.viewCount}
                </span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                <ShoppingCart size={15} className="opacity-70" />
                <span className="font-medium tabular-nums">
                  {data.purchaseCount}
                </span>
              </div>
            </div>
            <button
              onClick={handleAddCart}
              className="relative text-gray-400 hover:text-white transition-all p-2 rounded-lg hover:bg-white/5 active:scale-95 group/btn"
              aria-label="Thêm vào giỏ hàng"
            >
              <div className="absolute inset-0 rounded-lg bg-sky-400/20 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
              <Bookmark
                size={18}
                className="relative group-hover/btn:fill-sky-400 group-hover/btn:text-sky-400 transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBlocks;
