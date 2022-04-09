import { Swiper, SwiperSlide } from "swiper/react";
import Card from "@mui/material/Card";
import "swiper/css";
import { Container } from "@mui/material";

function TinderPage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Container sx={{ alignItems: "center" }}>
          <Card>xD</Card>
        </Container>
      </SwiperSlide>
    </Swiper>
  );
}

export default TinderPage;
