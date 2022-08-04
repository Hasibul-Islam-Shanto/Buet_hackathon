import React, { useEffect, useState } from 'react'
import {SearchAll} from "../Api/Api"
import { useSearchParams } from "react-router-dom";
import { Box, Card } from '@mui/material';
const SearchPages = () => {
    const ar = [1,2,3,4,5]
    const [search,setSearch] = useState([]);
      const [searchParams] = useSearchParams();
        const data = searchParams.get("q");
    useEffect(()=>{
        const getAllSearch = async()=>{
            const res = await SearchAll(data);
            setSearch(res.data.organic)
        }
        getAllSearch();
    },[])
    console.log(search)
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "40%",
            padding: "2rem",
          }}
        >
          {search.map((sear, i) => (
            <Card
              sx={{
                width: "100%",
                padding: "1.5rem 1rem",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontSize:"1.2rem",
                ":hover": {
                  transform: "scale(1.05)",
                  bgcolor: "rgba(0,0,0,.02)",
                  transition: ".3s ease-out",
                },
              }}
              onClick={() => {
                window.location.replace(sear.url);
              }}
              key={i}
            >
              {/* <img
                src={song.album.images[0].url}
                alt=""
                style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              /> */}
              <span>{sear.title}</span>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default SearchPages