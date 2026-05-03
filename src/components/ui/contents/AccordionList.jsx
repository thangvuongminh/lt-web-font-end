const AccordionList = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`flex items-center p-3 rounded-xl transition ${
        active
          ? "bg-purple-500/10 border border-purple-500/30"
          : "hover:bg-white/5"
      }`}
    >
      <div className="mr-3">{icon}</div>
      <div className="flex-1">
        <p className={`text-xs ${active ? "text-white" : "text-gray-400"}`}>
          {title}
        </p>
        <p className="text-[10px] text-gray-600 mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
