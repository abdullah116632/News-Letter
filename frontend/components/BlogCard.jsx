import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ _id, img, title, description }) => {
  return (
    <div className="bg-[#8207B34A] border-2 rounded-2xl px-3 py-4">
      <div className="flex flex-col justify-center items-center">
        <Image src={img} alt="blog image" height={350} width={380} />
        <h6 className="text-xl font-roboto font-semibold px-4 py-3 h-[3.5em] overflow-y-scroll hide-scrollbar">
          {title}
        </h6>
      </div>
      <div className="font-roboto flex flex-col justify-center items-center">
        <p className="text-sm px-7 h-[17em] overflow-hidden">{description}</p>
        <Link href={`/blogs/${_id}`}>
          <button className="bg-white text-black font-bold px-6 py-0.5 my-3 rounded-2xl cursor-pointer">
            READ MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
