import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function ReviewSlider() {
  return (
    <section>
      <Swiper
        loop={true}
        navigation={{
          nextEl: ".firstSlider-next-button",
          prevEl: ".firstSlider-prev-button",
        }}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "</span>";
          },
        }}
        className="reviewSlider"
      >
        <svg className="firstSlider-prev-button">
          <path d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2 2 6.48 2 12zm18 0c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8 8 3.58 8 8zM8 12l4-4 1.41 1.41L11.83 11H16v2h-4.17l1.59 1.59L12 16l-4-4z"></path>
        </svg>
        <svg className="firstSlider-next-button">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8zm12 0-4 4-1.41-1.41L12.17 13H8v-2h4.17l-1.59-1.59L12 8l4 4z"></path>
        </svg>
        <SwiperSlide>
          <Slide
            text={
              "If you are going to use a passage of Lorem Ipsum, you need to be sureisnt"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            text={
              "If you are going to use a passage of Lorem Ipsum, you need to be sureisnt"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            text={
              "If you are going to use a passage of Lorem Ipsum, you need to be sureisnt"
            }
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

function Slide({ text }) {
  return (
    <div className="ReviewSlide">
      <p>{text}</p>
    </div>
  );
}

export default ReviewSlider;
