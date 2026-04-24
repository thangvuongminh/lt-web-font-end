import React from "react";
import { Eye, ShoppingCart, Trash2, CreditCard, Signal } from "lucide-react";
import { Link } from "react-router-dom";
import notificationAntd from "@/utils/notifications/notificationAntd";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQueryClient } from "react-query";
import { useDeleteCartItem } from "@/hooks/useDeleteCartItem";
import defaultAvatar from "@images/defaultAvatar.png";

const CartItem = ({
  id,
  thumb,
  title,
  description,
  categoryName,
  viewCount,
  price,
  level,
  purchaseCount,
  nickname,
  urlAvatarAuthor,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteCartItem();

  const onRemove = () => {
    mutate(id, {
      onSuccess: () => {
        notificationAntd("success", "Thành công", "Đã xóa khỏi giỏ hàng.");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllCarts });
      },
    });
  };

  return (
    // THÊM: items-stretch để cột bên phải luôn cao bằng nội dung bên trái
    <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-5 hover:border-gray-700 transition-all  group">
      {/* 1. Thumbnail Section - Giữ nguyên style ContentBlocks */}
      <div className="w-full md:w-44 h-32 md:h-auto bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-gray-800 relative">
        <img
          src={thumb}
          alt={title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-[#0c233c] text-[#38bdf8] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#1e293b] uppercase">
            {level}
          </span>
        </div>
      </div>

      {/* 2. Main Content Section */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-1.5">
          <h3 className="text-base md:text-lg font-bold text-white line-clamp-1 leading-tight group-hover:text-[#38bdf8] transition-colors">
            {title}
          </h3>
          {/* Giá tiền nổi bật */}
          <span className="text-[#38bdf8] text-lg font-bold shrink-0">
            {price}
          </span>
        </div>

        {/* Description: Giới hạn 2 dòng, chiều cao cố định để ko bị lệch */}
        <p className="text-gray-400 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {description}
        </p>

        {/* Author Info: Thêm Link như bạn yêu cầu */}
        <Link
          to={nickname ? `/user/${nickname}` : "#"}
          className={`flex items-center gap-3 mb-6 ${nickname ? "pointer-events-none cursor-default" : ""}`}
          onClick={(e) => !nickname && e.preventDefault()}
        >
          <img
            src={urlAvatarAuthor ? urlAvatarAuthor : defaultAvatar}
            alt="Author"
            className="w-6 h-6 rounded-full border border-gray-700 object-cover"
          />
          <span className="text-xs text-gray-300 font-medium">
            {nickname || "On update"}
          </span>
        </Link>

        {/* 3. Footer Metrics: Đẩy xuống đáy bằng mt-auto */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800/50 mt-auto">
          <div className="flex items-center gap-4">
            <span className="bg-[#2e2e48] text-[#a78bfa] text-[10px] font-bold px-2 py-0.5 rounded">
              {categoryName}
            </span>
            <div className="flex gap-3 text-gray-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Eye size={14} className="text-gray-500" />
                <span>{viewCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShoppingCart size={14} className="text-gray-500" />
                <span>{purchaseCount}</span>
              </div>
            </div>
          </div>

          {/* Nút xóa nhanh chỉ hiện trên Mobile */}
          <button
            onClick={onRemove}
            className="md:hidden text-gray-500 hover:text-rose-500 p-1"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* 4. Desktop Action Panel: PHẦN FIX NGU ĐÂY */}
      <div className="hidden md:flex flex-col justify-center items-center shrink-0 pl-5 border-l border-gray-800 w-40 gap-3">
        {/* Nút Mua Ngay: Làm to và rõ ràng */}
        <button className="w-full bg-[#4f46e5] hover:bg-[#6366f1] text-white text-[11px] font-bold uppercase py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 active:scale-95">
          <CreditCard size={15} />
          <span>Mua Ngay</span>
        </button>

        {/* Nút Gỡ Bỏ: Thay đổi style để phân cấp rõ với nút chính */}
        <button
          onClick={onRemove}
          className="w-full flex items-center justify-center gap-2 py-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition-all text-[11px] font-bold uppercase tracking-wider"
        >
          <Trash2 size={14} />
          <span>Gỡ bỏ</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
