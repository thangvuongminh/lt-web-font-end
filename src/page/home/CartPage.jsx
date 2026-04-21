import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faShieldAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import CartItem from "@components/ui/contents/CartItem";
import { useFetchAllCart } from "@/hooks/useFetchAllCart";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const recodeOnPage = 3;

export const CartPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const { data: response, isLoading } = useFetchAllCart();
  const items = response?.data?.data || [];
  const navigate = useNavigate();

  let startSlice = recodeOnPage * (currentPage - 1);
  const itemDisplay = items.slice(startSlice, startSlice + recodeOnPage);
  if (itemDisplay.length == 0 && items.length > 0) {
    navigate(location.pathname);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-6 md:p-12">
      {/* Bỏ grid, cho container nhỏ lại để cân đối màn hình */}
      <main className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">
            My Cart
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold">
            Review your architectural selections
          </p>
        </header>

        {/* Danh sách item chiếm full chiều ngang container */}
        <div className="space-y-4 w-full">
          {itemDisplay?.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          setSearchParams={setSearchParams}
          sizePage={Object.keys(items).length}
          pageOnRecode={recodeOnPage}
        />
      </main>
    </div>
  );
};

export default CartPage;
