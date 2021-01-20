const axios = require("axios");
const options = {
  baseURL:
    "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json"
  }
};
const query =
  "query?where=county%20%3D%20'LK%20L%C3%9CNEBURG'%20OR%20county%20%3D%20'LK%20DITHMARSCHEN'%20OR%20county%20%3D%20'LK%20HEIDEKREIS'%20OR%20county%20%3D%20'SK%20BREMEN'&outFields=OBJECTID,Shape__Area,cases,deaths,cases_per_100k,cases_per_population,BL,BL_ID,county,last_update,cases7_per_100k,recovered,cases7_lk,death7_lk,cases7_per_100k_txt,death_rate&outSR=4326&f=json";

export const fetchRelevantData = () => axios.get(query, options);
