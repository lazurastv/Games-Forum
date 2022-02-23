import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
function NextArrow(props : any) {
  return (
    <IconButton
      disableFocusRipple
      disableRipple
      className="CarouselArrow"
      sx={{
        right: "15px",
      }}
      onClick={props.onClick}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}
function PrevArrow(props : any) {
  return (
    <IconButton
      disableFocusRipple
      disableRipple
      className="CarouselArrow"
      sx={{
        left: "15px",
      }}
      onClick={props.onClick}
    >
      <ArrowBackIosNewIcon sx={{ textAlign: "center" }} />
    </IconButton>
  );
}
const settings = {
  className: "Carousel",
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4 ,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
export default function Carousel(props : any) {
  return (
    <Slider {...settings}>{props.children}</Slider>
  );
}
