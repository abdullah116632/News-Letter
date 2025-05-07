"use client"
import { SwiperSlide } from 'swiper/react';
import CommentsCard from './CommentsCard';
import Slider from './helper/Slider';

const CommentSlider = ({comments}) => {
  return (
      <Slider>
      {comments.slice(0, 7).map((item, idx) => (
          <SwiperSlide key={idx}>
            <CommentsCard {...item} />
          </SwiperSlide>
        ))}
      </Slider>
  );
}

export default CommentSlider;
