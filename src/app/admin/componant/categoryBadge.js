export const CategoryBadge = ({ categoryName, totalfood }) => {
  return (
    <button className="w-auto rounded-2xl pl-2 gap-2 flex items-center border p-2 h-9">
      {categoryName}
      <div className="bg-black text-white rounded-2xl w-10 mr-1 h-5.5 justify-center items-center ">
        {totalfood}
      </div>
    </button>
  );
};
