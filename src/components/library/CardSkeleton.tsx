const CardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow animate-pulse bg-white dark:bg-gray-800">
      <div className="h-[180px] bg-gray-300 dark:bg-gray-700 shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded shimmer" />
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded shimmer" />
      </div>
    </div>
  );
};

export default CardSkeleton;
