import { comments } from "@/data/subscribersComments";
import CommentSlider from "./CommentSlider";
import Link from "next/link";

const SubscribersComments = () => {
  return (
    <div className="relative mt-10 xl:mt-24 mb-10 xl:mb-36">
      {/* Background image behind the comment section */}
      <div className='absolute -z-10 w-[100vw] h-[80vh] md:h-[66vw] bg-[url("/images/commentsBg.png")] bg-no-repeat bg-contain' />

      {/* Foreground content */}
      <div className="w-full">
        {/* Header: Title and 'View All' button */}
        <div className="flex justify-between px-4 md:px-12 xl:px-24 py-3 md:pb-3 xl:pb-12 md:mb-7">
          <h5 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FB] to-[#FFAE00] w-fit xxs:text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
            What Our Subscribers Say
          </h5>
          <Link href="/comments">
            <button className="text-[#FF0000] border-2 border-[#FF0000] h-8 sm:h-12 rounded-3xl text-sm lg:text-2xl bg-gradient-to-r from-[#FFFFFF] to-[#999999] font-dmSans font-bold px-2 sm:px-4 cursor-pointer">
              View All
            </button>
          </Link>
        </div>

        {/* Comment slider: displays the list of subscriber comments */}
        <div className="px-3 sm:px-2 lg:px-8 xl:px-20">
          <CommentSlider comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default SubscribersComments;
