import React from 'react'
import Box from "@mui/material/Box";
import { Grid, Item } from "@mui/material";
const News = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default News