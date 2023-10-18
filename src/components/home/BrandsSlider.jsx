import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Brand1 from "../../assets/1.webp";
import Brand2 from "../../assets/2.webp";
import Brand3 from "../../assets/5.webp";
import Brand4 from "../../assets/6.webp";
import Brand5 from "../../assets/7.webp";

const Brands = [Brand1, Brand2, Brand3, Brand4, Brand5];
function BrandsSlider() {
  return (
    <section className="brands">
      <ArrowForwardOutlinedIcon
        id={"NextBrandSliderBtn"}
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "50%",
          right: "0px",
          color: "rgb(138, 138, 138) ",
          fontSize: "1.7rem",
          zIndex: "5000000",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <ArrowBackOutlinedIcon
        id={"PrevBrandSliderBtn"}
        sx={{
          cursor: "pointer",
          color: "rgb(138, 138, 138)",
          position: "absolute",
          bottom: "50%",
          left: "0",
          fontSize: "1.7rem",
          zIndex: "5000000",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <Swiper
        navigation={{
          nextEl: "#NextBrandSliderBtn",
          prevEl: "#PrevBrandSliderBtn",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
        }}
        observer={true}
        spaceBetween={30}
        loop={true}
        modules={[Navigation, Pagination]}
      >
        {Brands &&
          Brands.map((brandImg, ind) => (
            <SwiperSlide key={ind + 1}>
              <Brand Image={brandImg} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
function Brand({ Image }) {
  return (
    <div className="brand">
      <img src={Image} loading="lazy" alt="" />
    </div>
  );
}
export default BrandsSlider;
