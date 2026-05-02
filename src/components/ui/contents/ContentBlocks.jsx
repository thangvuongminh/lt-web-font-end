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
    // THÊM: flex flex-col h-full để card luôn cao bằng nhau trong Grid
    <div className="flex flex-col h-full lg:max-w-87.5 bg-[#0f172a] text-white rounded-xl overflow-hidden shadow-2xl font-sans border border-gray-800">
      {/* Thumbnail Area */}
      <div className="relative h-48 shrink-0">
        <img
          src={data.thumb}
          alt="Course"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#0c233c] text-[#38bdf8] text-[10px] font-bold px-2 py-1 rounded border border-[#1e293b]">
            {data.level}
          </span>
          <span className="bg-[#2e2e48] text-[#a78bfa] text-[10px] font-bold px-2 py-1 rounded">
            {data.categoryName}
          </span>
        </div>
      </div>

      {/* Body Content: Thêm flex-1 để chiếm không gian còn lại */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title: Ép cứng chiều cao (h-14 tương đương 2 dòng text) */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <h2 className="text-lg font-bold leading-tight h-12 line-clamp-2">
            {data.title}
          </h2>
          <span className="text-[#38bdf8] text-lg font-bold shrink-0">
            {data.price}
          </span>
        </div>

        {/* Description: Ép cứng chiều cao để không bị đẩy lên xuống */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
          {data.description}
        </p>

        {/* Author Info */}
        <Link
          to={data.nickname ? `/user/${data.nickname}` : "#"}
          className={`flex items-center gap-3 mb-6 ${!data.nickname ? "pointer-events-none cursor-default" : ""}`}
          onClick={(e) => !data.nickname && e.preventDefault()} // Chặn thêm cho chắc
        >
          <img
            src={data?.urlAvatarAuthor ? data?.urlAvatarAuthor : defaultAvatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-gray-700 object-cover"
          />
          <div>
            <p className="text-sm font-semibold">
              {data?.nickname ? data.nickname : "On update"}
            </p>
          </div>
        </Link>

        {/* Footer Metrics: Thêm mt-auto để luôn dính chặt vào đáy card */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-800 mt-auto">
          <div className="flex gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1.5">
              <Eye size={16} />
              <span>{data.viewCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShoppingCart size={16} />
              <span>{data.purchaseCount}</span>
            </div>
          </div>
          <button
            onClick={handleAddCart}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentBlocks;
