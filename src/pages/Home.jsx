import LoadingComponent from "../components/Loading";
import FirstSlider from "../components/home/firstSlider";
import Features from "../components/home/features";
import CheckOutCollection from "../components/home/checkOutCollection";
import SecondJewellerySlider from "../components/home/secondSlider";
import DummySection from "../components/home/dummySection";
import MainJewelSlider from "../components/home/mainJewelSlider";
import ReviewSlider from "../components/home/reviewSlider";
import BlogPosts from "../components/home/BlogPosts";
import BrandsSlider from "../components/home/BrandsSlider";
import SubscribeEmail from "../components/home/SubscribeEmail";
import Center from "../components/Center";
import { useSelector } from "react-redux";
import { jewellerySelector } from "../redux/selectors";
function Home() {
  const { error, Loading } = useSelector(jewellerySelector);
  if (error)
    return (
      <Center>
        <p>Error has occured Try again</p>
      </Center>
    );
  return Loading ? (
    <LoadingComponent />
  ) : (
    <>
      <FirstSlider />
      <Features />
      <CheckOutCollection />
      <SecondJewellerySlider />
      <DummySection />
      <MainJewelSlider header={"Feature Products"} num={1} />
      <ReviewSlider />
      <MainJewelSlider header={"New Arrivals"} num={2} />
      <BlogPosts />
      <BrandsSlider />
      <SubscribeEmail />
    </>
  );
}

export default Home;
