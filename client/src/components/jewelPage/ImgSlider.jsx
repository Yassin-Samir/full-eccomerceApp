import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Controller } from "swiper/modules";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function ImgSlider({ jewelImgs }) {
  const { jewel } = useParams();
  useEffect(() => {
    setCurrentImg(jewelImgs[0]);
  }, [jewel]);
  const [CurrentImg, setCurrentImg] = useState("");
  return (
    <div className="JewelImgSlider">
      <img src={CurrentImg} loading="eager" />
      <Swiper
        modules={[Navigation, Controller, Pagination]}
        onSlideChange={({ realIndex }) => {
          setCurrentImg(jewelImgs[realIndex]);
        }}
        navigation={{
          nextEl: `#NextJewelSlideBtn`,
          prevEl: `#PrevPrevSlideBtn`,
        }}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
      >
        {jewelImgs &&
          jewelImgs.map((Img, ind) => (
            <SwiperSlide key={ind + 1}>
              <img
                src={Img}
                loading="lazy"
                style={{ userSelect: "none" }}
                alt=""
              />
            </SwiperSlide>
          ))}
        <KeyboardArrowLeftIcon
          id="PrevPrevSlideBtn"
          sx={{
            position: "absolute",
            left: "0",
            top: "45%",
            transform: "translateY(-50%)",
            zIndex: 1000000000,
            cursor: "pointer",
            fontSize: "2rem",
          }}
        />
        <KeyboardArrowRightIcon
          id="NextJewelSlideBtn"
          sx={{
            position: "absolute",
            right: "0",
            top: "45%",
            transform: "translateY(-50%)",
            zIndex: 1000000000,
            cursor: "pointer",
            fontSize: "2rem",
          }}
        />
      </Swiper>
    </div>
  );
}
export default ImgSlider;
