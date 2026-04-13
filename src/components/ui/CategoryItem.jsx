import ai from "@images/ai.png";

const CategoryItem = ({ icon, label, activeColor }) => (
  <div className="group p-6 rounded-xl bg-[#131b2e] hover:bg-[#2d3449] transition-all duration-300 flex flex-col items-center text-center cursor-pointer">
    <div
      className={`w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#2d3449] group-hover:${activeColor}/20 transition-colors`}
    >
      <img src={icon}></img>
    </div>
    <span className="font-medium text-[#dae2fd]">{label}</span>
  </div>
);
export default CategoryItem;
