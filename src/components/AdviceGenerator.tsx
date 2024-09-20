import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import PauseIcon from "@mui/icons-material/Pause";

const CustomBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  maxWidth: "100%",
  padding: "0 20px",
}));

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#323a49",
  borderRadius: "16px",
  height: "22rem",
  maxWidth: "37rem",
  position: "relative",
  overflow: "visible",
  [theme.breakpoints.up("md")]: {
    height: "22rem",
    maxWidth: "37rem",
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  display: "flex",
  justifyContent: "center",
  color: "hsl(150, 100%, 66%)",
  marginBottom: "20px",
  fontSize: "18px",
  [theme.breakpoints.up("md")]: {
    fontSize: "24px",
  },
}));

const QuoteTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Manrope, sans-serif",
  fontSize: "20px",
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  marginBottom: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "28px",
  },
}));

const HorizontalRule = styled("hr")(() => ({
  width: "100%",
  backgroundColor: "hsl(217, 19%, 38%)",
  border: "solid hsl(217, 19%, 38%)",
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  color: "hsl(218, 23%, 16%)",
  backgroundColor: "hsl(150, 100%, 66%)",
  height: "50px",
  width: "50px",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 0 20px 5px hsl(150, 100%, 66%)",
    backgroundColor: "hsl(150, 100%, 66%)",
  },
  [theme.breakpoints.up("md")]: {
    height: "70px",
    width: "70px",
  },
}));

const AdviceGenerator = () => {
  const [adviceNumber, setAdviceNumber] = useState(0);
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.adviceslip.com/advice?t=${new Date().getTime()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceNumber(adviceNumber + 1);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <CustomBox>
      <CustomCard>
        <CardContent sx={{ mt: 3 }}>
          <TitleTypography>ADVICE #{adviceNumber}</TitleTypography>
          <QuoteTypography className="quote">"{advice}"</QuoteTypography>
          <Box sx={{ position: "relative" }}>
            <PauseIcon
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%) translateY(-45%)",
                color: "white",
                backgroundColor: "#323a49",
              }}
            />
            <HorizontalRule />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            position: "absolute",
            bottom: "-35px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <CustomIconButton
            onClick={fetchAdvice}
            aria-label="new advice"
            disabled={loading}
          >
            <CasinoIcon />
          </CustomIconButton>
        </CardActions>
      </CustomCard>
    </CustomBox>
  );
};
export default AdviceGenerator;
