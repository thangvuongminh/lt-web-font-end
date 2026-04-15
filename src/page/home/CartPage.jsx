import React from "react";
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
import CartItem from "@components/ui/contents/CartItem";
export const CartPage = () => {
  const cartItems = [
    {
      title: "React Architecture Pattern",
      category: "Frontend",
      views: "12.4k",
      price: 124.0,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      badges: [
        { icon: faSyncAlt, text: "Updates" },
        { icon: faFilePdf, text: "Code" },
      ],
    },
    {
      title: "Python Automation Script",
      category: "Backend",
      views: "8.2k",
      price: 89.0,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      badges: [
        { icon: faDownload, text: "Instant" },
        { icon: faTerminal, text: "Bash" },
      ],
    },
    {
      title: "Microservices Deploy Stack",
      category: "Infrastructure",
      views: "3.5k",
      price: 210.0,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
      badges: [
        { icon: faCloud, text: "AWS Ready" },
        { icon: faShieldAlt, text: "Enterprise" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-6 md:p-12">
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <header className="mb-10">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">
              My Cart
            </h1>
            <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold">
              Review your architectural selections
            </p>
          </header>

          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <CartItem key={index} {...item} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-800/60 text-[10px] font-bold uppercase tracking-widest">
            <button className="flex items-center text-slate-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Store
            </button>
            <span className="text-slate-600">3 Items selected</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 text-center">
              Order Summary
            </h2>
            <div className="space-y-5 text-sm font-medium">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-bold tracking-tight">
                  $423.00
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Fees</span>
                <span className="text-emerald-500 uppercase text-[10px] font-black tracking-widest">
                  Calculated $0
                </span>
              </div>

              <div className="border-t border-slate-800 pt-6 mt-6 flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Total
                </span>
                <span className="text-4xl font-black text-white tracking-tighter">
                  $423.00
                </span>
              </div>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl mt-10 transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-widest text-xs">
              Checkout Now
            </button>
            <div className="flex justify-center items-center mt-6 text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">
              <FontAwesomeIcon icon={faLock} className="mr-2 opacity-50" />
              Encrypted Transaction
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 flex items-start space-x-4">
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-indigo-500/60 mt-1"
            />
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed uppercase tracking-wider">
              Assets are architect-vetted for clean code.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
