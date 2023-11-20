import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { jewelleryItemSelector } from "../../redux/selectors";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Jewel from "../jewel";
import { Button } from "@mui/material";
function SecondJewellerySlider() {
  const jewels = useSelector(jewelleryItemSelector);

  return (
    <section className="secondJewellerySlider">
      <ArrowForwardOutlinedIcon
        id="NextSecondSliderBtn"
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "102%",
          right: "0px",
          color: "rgb(138, 138, 138) ",
          fontSize: "1.7rem",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <ArrowBackOutlinedIcon
        id="PrevSecondSliderBtn"
        sx={{
          cursor: "pointer",
          color: "rgb(138, 138, 138)",
          position: "absolute",
          bottom: "102%",
          right: "35px",
          fontSize: "1.7rem",
          zIndex: "50",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <aside>
        <h1>Best Sellers</h1>
        <p>
          many desktop publishing packages and web page editors now use lorem
          ipsum as their default model text, and a search for 'lorem ipsum'
          still in their infancy.
        </p>
        <Button
          variant="contained"
          component={Link}
          to={"/shop"}
          sx={{
            width: "110px",
            textAlign: "center",
          }}
        >
          VIEW ALL
        </Button>
      </aside>
      <Swiper
        navigation={{
          prevEl: "#PrevSecondSliderBtn",
          nextEl: "#NextSecondSliderBtn",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          820: {
            slidesPerView: 3,
          },
          1079: {
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
                src={jewels[key]?.src}
                name={key}
                brand={jewels[key]?.brand}
                price={jewels[key]?.price}
                priceId={jewels[key]?.priceId}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}

export default SecondJewellerySlider;
