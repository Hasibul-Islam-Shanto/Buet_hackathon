import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ArticleIcon from '@mui/icons-material/Article';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
export default function Cards(props) {
const Icon = {
  Music: <MusicNoteIcon sx={{ color: "#0C214C" }} />,
  News: <ArticleIcon sx={{color:"#0C214C" }}/>,
  Map: <MyLocationIcon sx={{color:"#0C214C"}}/>,
  Search: <SearchIcon sx={{color:"#0C214C"}}/>
};
  return (
    <Card
      sx={{
        height: "130px",
        width: "200px",
        borderRadius: "15px",
        boxShadow: "2px",
        backgroundColor: "#C4D6FC",
      }}>
      <CardContent sx={{ textAlign: "center" }}>
        {/* <MusicNoteIcon sx={{ color: "#0C214C" }} /> */}
        {Icon[props.icon]}
        <Typography
          sx={{
            color: "#0C214C",
            fontWeight: "bold",
            fontFamily: "Product Sans",
          }}>
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}