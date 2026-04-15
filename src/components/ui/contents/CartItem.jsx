import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, // Đã đổi sang icon con mắt cho lượt xem
  faArrowLeft,
  faLock,
  faShieldAlt,
  faSyncAlt,
  faFilePdf,
  faDownload,
  faTerminal,
  faCloud,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
const CartItem = ({
  image,
  title,
  category,
  views, // Đổi từ rating/reviews sang views
  price,
  badges,
}) => (
  <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 mb-4 flex flex-col md:flex-row items-center justify-between hover:border-indigo-500/50 transition-colors">
    <div className="flex items-center w-full">
      <div className="w-24 h-24 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="ml-5 flex-grow">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center text-slate-400 text-[11px] font-medium">
            <FontAwesomeIcon icon={faEye} className="mr-1.5 text-slate-500" />
            <span>{views} lượt xem</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>

        <div className="flex mt-3 space-x-5">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center text-slate-500 text-[11px] font-medium uppercase tracking-widest"
            >
              <FontAwesomeIcon
                icon={badge.icon}
                className="mr-1.5 text-indigo-500/60"
              />
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between h-full mt-4 md:mt-0 ml-4">
      <span className="text-2xl font-black text-white tracking-tighter">
        <span className="text-indigo-500 text-lg mr-0.5">$</span>
        {price.toFixed(2)}
      </span>
      <button className="text-rose-500 hover:text-rose-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-4 transition-colors">
        <FontAwesomeIcon icon={faTrashAlt} className="mr-1.5" /> Remove
      </button>
    </div>
  </div>
);
export default CartItem;
