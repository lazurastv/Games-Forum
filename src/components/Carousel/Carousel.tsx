import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
function CarouselArrow(props: any) {
  return (
    <IconButton
      disableFocusRipple
      disableRipple
      className="CarouselArrow"
      sx={{
        display: "flex",
        backgroundColor: "primary.main",
        top: "calc(50% - 20px)",
        color: "secondary.main",
        transition: "opacity 0.3s ease-in-out",
        opacity: 0.7,
        position: "absolute",
        zIndex: 1,
        right: props.next ? "15px" : "",
        left: props.prev ? "15px" : "",
        "&:hover": {
          color: "primary.main",
          backgroundColor: "secondary.main",
          opacity: 1,
        },
      }}
      onClick={props.onClick}
    >
      {props.next ? (
        <ArrowForwardIosIcon />
      ) : (
        <ArrowBackIosNewIcon sx={{ textAlign: "center" }} />
      )}
    </IconButton>
  );
}
const settings = {
  className: "Carousel",
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  nextArrow: <CarouselArrow next />,
  prevArrow: <CarouselArrow prev />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export default function Carousel(props: any) {
  return <Slider {...settings} {...props.settings}>{props.children}</Slider>;
}
