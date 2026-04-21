import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
  faSignal,
  faCartShopping,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import notificationAntd from "@/utils/notifications/notificationAntd";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQueryClient } from "react-query";
import { useDeleteCartItem } from "@/hooks/useDeleteCartItem";

const CartItem = ({
  id,
  thumb,
  title,
  categoryName,
  viewCount,
  price,
  level,
  purchaseCount,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteCartItem();

  const onRemove = () => {
    mutate(id, {
      onSuccess: () => {
        notificationAntd("success", "Delete success", "Removed from cart.");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllCarts });
      },
    });
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-3 md:p-5 mb-4 flex gap-4 hover:border-indigo-500/50 transition-colors items-start">
      <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-700">
        <img
          src={thumb}
          alt={title}
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="grow min-w-0 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[9px] md:text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {categoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-[10px] md:text-[11px]">
              <FontAwesomeIcon
                icon={faEye}
                className="text-slate-500"
                size="xs"
              />
              <span>{viewCount}</span>
            </div>
          </div>
          <h3 className="text-sm md:text-base font-bold text-white tracking-tight line-clamp-2 leading-tight mb-2">
            {title}
          </h3>
          <div className="flex gap-3 md:gap-5 flex-wrap">
            <div className="flex items-center gap-1 text-slate-500 text-[9px] md:text-[10px] font-semibold uppercase">
              <FontAwesomeIcon icon={faSignal} className="text-indigo-500/60" />
              {level}
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-[9px] md:text-[10px] font-semibold uppercase">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-indigo-500/60"
              />
              {purchaseCount}
            </div>
          </div>
        </div>

        {/* Action Mobile */}
        <div className="flex md:hidden items-center justify-between mt-3 pt-3 border-t border-slate-800/50">
          <span className="text-lg font-black text-white tracking-tighter">
            <span className="text-indigo-500 text-sm mr-0.5">$</span>
            {price?.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase">
              Buy
            </button>
            <button onClick={onRemove} className="text-rose-500 p-1">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Desktop */}
      <div className="hidden md:flex flex-col items-end justify-between self-stretch shrink-0 pl-4 border-l border-slate-800">
        <span className="text-2xl font-black text-white tracking-tighter leading-none">
          <span className="text-indigo-500 text-base font-bold mr-0.5">$</span>
          {price?.toFixed(2)}
        </span>
        <div className="flex flex-col gap-2 w-full">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold uppercase py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCreditCard} size="xs" /> Buy Now
          </button>
          <button
            onClick={onRemove}
            className="text-rose-500 hover:text-rose-400 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5"
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
