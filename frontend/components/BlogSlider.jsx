"use client"
import { SwiperSlide } from 'swiper/react';
import Slider from './helper/Slider';
import BlogCard from './BlogCard';

const BlogSlider = ({blogs}) => {
  return (
      <Slider>
      {blogs?.slice(0, 7).map((item, idx) => (
          <SwiperSlide key={idx}>
            <BlogCard {...item} />
          </SwiperSlide>
        ))}
      </Slider>
  );
}

export default BlogSlider;
