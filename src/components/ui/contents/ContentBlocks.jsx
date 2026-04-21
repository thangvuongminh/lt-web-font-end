import React from "react";
import { Eye, ShoppingCart, Bookmark, Star } from "lucide-react";
import { useAddCart } from "./../../../hooks/useAddCart";
import notificationAntd from "@/utils/notifications/notificationAntd";

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
      // onError: (err) => {
      // },
    });
  };
  return (
    <div className=" lg:max-w-87.5  bg-[#0f172a] text-white rounded-xl overflow-hidden shadow-2xl font-sans">
      <div className="relative h-48">
        <img
          src={data.thumb}
          alt="Course"
          className="w-full h-full object-cover  opacity-60"
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

      {/* Body Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold leading-tight w-3/4">
            {data.title}
          </h2>
          <span className="text-[#38bdf8] text-xl font-bold">{data.price}</span>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {data.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://i.pravatar.cc/150?u=alex"
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-gray-700"
          />
          <div>
            <p className="text-sm font-semibold">{data.author}</p>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
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
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bookmark size={20} onClick={() => handleAddCart()} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentBlocks;
