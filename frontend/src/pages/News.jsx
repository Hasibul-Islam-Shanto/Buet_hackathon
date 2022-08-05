import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { TopNews } from "../Api/Api";

const News = () => {
  const arr = [1, 2, 3, 4];
  const [news, setNews] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let latlot = {
      lat: searchParams.get("lat"),
      lot: searchParams.get("lot"),
    };
    const getNews = async () => {
      const res = await TopNews(latlot);
      setNews(res.data.articles);
      console.log(res.data.articles);
    };
    getNews();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100wv",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 30 }}>All latest news</Typography>
        <Box
          sx={{
            width: "100%",
          }}
          className="grid_news"
        >
          {news.map((ne,i) => (
            <Card
              sx={{
                height: "300px",
                ":hover": {
                  transform: "scale(1.05)",
                  transition: ".3s ease-in-out",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2rem",
              }}
              key={i}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {ne.title}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Small description
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: "#65BA84",
                    ":hover": { bgcolor: "#65BA84" },
                    fontSize: "1rem",
                    textTransform: "capitalize",
                    padding: ".5rem",
                    marginBottom:"-10px"
                  }}
                  onClick={()=>{
                     window.location.replace(ne.link);
                  }}
                >
                  Read full news
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default News;
