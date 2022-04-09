import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Container, Typography } from "@mui/material";

function ResultContainer({ score, best_cars: bestCars }) {
  const Icon;

  let iconProps;
  let text;
  let fontColor;
  if (score < 33.33) {
    Icon = SentimentVeryDissatisfiedIcon;
    iconProps = {
      sx: {
        fontSize: "100px",
      },
      color: "error",
    };
    fontColor = "#d4492e";
    text =
      "It won't be really beneficial for you to go electric right now. But earth would be very happy if you would !!!";
  } else if (score < 66.66) {
    Icon = SentimentSatisfiedIcon;
    iconProps = {
      sx: {
        fontSize: "100px",
      },
      color: "#f7c433",
    };
    fontColor = "#f7c433";
    text =
      "Go Electric if you can.appreciate Won't be the game changer, but earth would appreciate it";
  } else {
    Icon = SentimentSatisfiedAltIcon;
    iconProps = {
      sx: {
        fontSize: "100px",
      },
      color: "success",
    };
    fontColor = "#407d32";
    text = "GO ELECTRIC RIGHT NOW!!! Earth won't wait forever.";
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Icon {...iconProps} />
      <Typography variant="h3" color={fontColor}>
        Your score is {score} %
      </Typography>
      <Typography variant="p">{text}</Typography>
    </Container>
  );
}

export default ResultContainer;
