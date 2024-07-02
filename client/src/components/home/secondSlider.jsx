import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { jewelleryItemSelector } from "../../redux/selectors";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Jewel from "../jewel";
import { Box, Button, Stack, Typography } from "@mui/material";
function SecondJewellerySlider() {
  const jewels = useSelector(jewelleryItemSelector);
  const forwardRef = useRef();
  const PrevRef = useRef();
  return (
    <Box position={"relative"} margin={"50px auto 0"} width={"90%"}>
      <h1
        style={{
          marginBottom: "20px",
          width: "fit-content",
          fontSize: "3rem",
        }}
      >
        Best Sellers
      </h1>
      <ArrowForwardOutlinedIcon
        ref={forwardRef}
        id="NextSecondSliderBtn"
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "91.5%",
          right: "0px",
          color: "rgb(138, 138, 138) ",
          fontSize: "1.7rem",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <ArrowBackOutlinedIcon
        ref={PrevRef}
        id="PrevSecondSliderBtn"
        sx={{
          cursor: "pointer",
          color: "rgb(138, 138, 138)",
          position: "absolute",
          bottom: "91.5%",
          right: "35px",
          fontSize: "1.7rem",
          zIndex: "50",
          "&:hover": {
            color: "#000",
          },
        }}
      />
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
        loop
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
    </Box>
  );
}

export default SecondJewellerySlider;
