import { Container, Typography } from "@mui/material";

function AboutPage() {
  return (
    <Container sx={{ "text-align": "center" }}>
      <Typography variant="h1" sx={{ pb: 10 }}>
        Go Electric
      </Typography>
      <Typography variant="h5">
        This Application is all about giving you knowledge if you should buy
        electric car. Thankfully our wonderful algorithm can do this in a
        seconds !!! Just put params to the format and get your feedback today
        !!!
      </Typography>
    </Container>
  );
}

export default AboutPage;
