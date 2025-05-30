import Image from "next/image";
import StarRatings from "./helper/StarRatings";

const UserReviewCard = ({ review }) => {
  return (
    <div className="pt-10 sm:pt-14 md:pt-12 xl:pt-14">
      <div className="relative w-full">
        {/* Profile Image */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-9 rounded-full">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden shadow-md">
            <Image
              src={review?.user?.img || "/images/userprofile.png"}
              alt="commenter img"
              width={70}
              height={70}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="font-dmSans border-2 border-white rounded-2xl bg-[#001D934A] p-4">
          <div className="flex flex-col justify-center items-center w-full overflow-hidden">
            <h3 className="mt-7 font-bold text-2xl sm:text-3xl md:text-2xl lg:text-3xl h-[1.2em]">
              {review?.user?.fullName}
            </h3>
            <h4 className="text-xs my-0.5 xl:my-1 h-[1.2em]">{review?.user?.profession}</h4>
            <h6 className="text-sm md:text-xs lg:text-sm h-[1.2em]">{review?.user?.institute}</h6>
            <StarRatings rating={review?.rating} />
          </div>

          {/* Comment */}
          <p className="h-64 mb-2 sm:mb-5 overflow-y-scroll text-center hide-scrollbar">
            {review?.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserReviewCard;
