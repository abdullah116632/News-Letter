"use client"
import { SwiperSlide } from 'swiper/react';
import UserReviewCard from './UserReviewCard';
import Slider from './helper/Slider';

const UserReviewSlider = ({reviews}) => {
  return (
      <Slider>
      {reviews?.slice(0, 7).map((review, idx) => (
          <SwiperSlide key={idx}>
            <UserReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Slider>
  );
}

export default UserReviewSlider;
