import axios from "axios"

export const Musics = async(data) =>{
    console.log(data)
    const res = await axios.get(`http://localhost:4000/api/phaseone/songlist?q=${data}`);
    return res;
}
export const TopNews = async (data) => {
  console.log(data);
  const res = await axios.get(
    `http://localhost:4000/api/phaseone/topnews?lat=${data.lat}&lat=${data.lot}`
  );
  return res;
};
export const SearchAll = async(data) =>{
    const res = await axios.get(
      `http://localhost:4000/api/phaseone/googlesearch?q=${data}`
    );
  return res;
}