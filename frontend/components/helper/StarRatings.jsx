const StarRatings = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1 text-[#FFBB00] text-5xl md:text-4xl lg:text-5xl my-2 md:my-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  export default StarRatings;
  