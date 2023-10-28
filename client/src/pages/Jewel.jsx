import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { customJewelPropsSelector } from "../redux/selectors";
import ImgSlider from "../components/jewelPage/ImgSlider";
import MainJewelSlider from "../components/home/mainJewelSlider";
import JewelProps from "../components/jewelPage/JewelProps";

function Jewel() {
  const { jewel } = useParams();
  const navigate = useNavigate();
  const jewelItem = useSelector(customJewelPropsSelector(jewel));
  useLayoutEffect(() => {
    !jewelItem ? navigate("/404") : null;
  }, [jewel]);
  return jewelItem ? (
    <>
      <div className="jewelPage">
        <ImgSlider jewelImgs={jewelItem?.src} />
        <JewelProps jewelItem={jewelItem} />
      </div>
      <MainJewelSlider num={5} header={"You may also like"} />
    </>
  ) : null;
}

export default Jewel;
