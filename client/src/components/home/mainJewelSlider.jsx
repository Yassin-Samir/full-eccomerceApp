import { useSelector } from "react-redux";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { jewelleryItemSelector } from "../../redux/selectors";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Jewel from "../jewel";
function MainJewelSlider({ header, num }) {
  const jewels = useSelector(jewelleryItemSelector);

  return (
    <section className="mainJewelSlider">
      <ArrowForwardOutlinedIcon
        id={`NextFeaturedSlideBtn${num}`}
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "90%",
          right: "0px",
          color: "rgb(138, 138, 138) ",
          fontSize: "1.7rem",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <ArrowBackOutlinedIcon
        id={`PrevFeaturedSlideBtn${num}`}
        sx={{
          cursor: "pointer",
          color: "rgb(138, 138, 138)",
          position: "absolute",
          bottom: "90%",
          right: "35px",
          fontSize: "1.7rem",
          zIndex: "50",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <h1>{header}</h1>
      <Swiper
        navigation={{
          nextEl: `#NextFeaturedSlideBtn${num}`,
          prevEl: `#PrevFeaturedSlideBtn${num}`,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          720: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        loop={true}
        modules={[Navigation, Pagination]}
      >
        {jewels &&
          Object.keys(jewels).map((key, ind) => (
            <SwiperSlide key={ind}>
              <Jewel
                src={jewels[`${key}`]?.src}
                name={key}
                brand={jewels[`${key}`]?.brand}
                price={jewels[`${key}`]?.price}
                priceId={jewels[`${key}`]?.priceId}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
export default MainJewelSlider;
