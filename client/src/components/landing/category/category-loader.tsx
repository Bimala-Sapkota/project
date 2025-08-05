const CategoryCardLoader = () => {
  return (
    <div className="p-4 flex items-center gap-2 bg-[#f8f8f8] rounded-md animate-pulse">
      {/* Placeholder Icon */}
      <div className="w-[30px] h-1[30px] bg-gray-300 rounded-full" />

      {/* Placeholder Title */}
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded mb-1" />
        <div className="h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default CategoryCardLoader;
