import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image1 from "../../assets/3.jpg";
import Image2 from "../../assets/4.jpg";
import Image3 from "../../assets/11.jpg";
import Image4 from "../../assets/12.jpg";
const Images = [Image1, Image2, Image3, Image4];
function BlogPosts() {
  return (
    <section className="BlogPosts">
      <ArrowForwardOutlinedIcon
        id={"NextBlogSliderBtn"}
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
        id={"PrevBlogSliderBtn"}
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
      <h1>Blog posts</h1>
      <Swiper
        navigation={{
          nextEl: "#NextBlogSliderBtn",
          prevEl: "#PrevBlogSliderBtn",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          770: {
            slidesPerView: 2,
          },
        }}
        spaceBetween={30}
        loop={true}
        modules={[Navigation, Pagination]}
      >
        {Images &&
          Images.map((Img, ind) => (
            <SwiperSlide key={ind + 1}>
              <BlogPost Image={Img} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}

function BlogPost({ Image }) {
  return (
    <div className="BlogPost">
      <img src={Image} alt="" loading="eager" />
      <div>
        <h2>November 17, 2022</h2>
        <p className="header">Browse Through More Products Of Classic.</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <button className="readMoreBtn">Read More</button>
      </div>
    </div>
  );
}
export default BlogPosts;
