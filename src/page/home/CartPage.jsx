import React from "react";
import { ShoppingCart } from "lucide-react"; // Dùng icon cho đẹp
import CartItem from "@components/ui/contents/CartItem";
import { useFetchAllCart } from "@/hooks/useFetchAllCart";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const recodeOnPage = 3;

export const CartPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const { data: response, isLoading } = useFetchAllCart();
  const items = response?.data?.data || [];
  const navigate = useNavigate();

  let startSlice = recodeOnPage * (currentPage - 1);
  const itemDisplay = items.slice(startSlice, startSlice + recodeOnPage);

  if (itemDisplay.length === 0 && items.length > 0) {
    navigate(location.pathname);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-6 md:p-12">
      <main className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">
            My Cart
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold">
            Review your architectural selections
          </p>
        </header>

        {/* Kiểm tra nếu có item thì hiện danh sách, không thì hiện thông báo */}
        {items.length > 0 ? (
          <>
            <div className="space-y-4 w-full">
              {itemDisplay?.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              setSearchParams={setSearchParams}
              sizePage={items.length}
              pageOnRecode={recodeOnPage}
            />
          </>
        ) : (
          /* TRẠNG THÁI TRỐNG (EMPTY STATE) */
          <div className="flex flex-col items-center justify-center py-20 bg-[#0f172a]/50 rounded-2xl border border-dashed border-slate-800">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={40} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-xs">
              Có vẻ như bạn chưa chọn được kiến trúc ưng ý nào cho dự án của
              mình.
            </p>
            <Link
              to="/"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all active:scale-95"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
