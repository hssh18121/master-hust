const OrangeButton = ({ icon, title }) => {
  return (
    <button className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-add text-white hover:bg-orange-400 transition-all">
      <span className="text-2xl">{icon}</span>
      <span>{title}</span>
    </button>
  );
};

export default OrangeButton;
