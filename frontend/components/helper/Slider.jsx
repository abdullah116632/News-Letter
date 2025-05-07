import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Slider = ({ children }) => {
  return (
      <Swiper
        modules={[Pagination, Mousewheel]}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.2,
          releaseOnEdges: true,
        }}
        grabCursor={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
        className="pb-20"
      >
        {children}
        <div className="custom-swiper-pagination mt-9 sm:xl:mt-14 xl:mt-20 flex justify-center gap-3" />
      </Swiper>
  );
};

export default Slider;
