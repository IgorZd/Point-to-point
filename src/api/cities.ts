import { useEffect, useState } from "react";

export interface CityType {
  name: string;
  lat: number;
  lng: number;
}

const cities = [
  { name: "Paris", lat: 48.856614, lng: 2.352222 },
  { name: "Marseille", lat: 43.296482, lng: 5.36978 },
  { name: "Lyon", lat: 45.764043, lng: 4.835659 },
  { name: "Toulouse", lat: 43.604652, lng: 1.444209 },
  { name: "Nice", lat: 43.710173, lng: 7.261953 },
  { name: "Nantes", lat: 47.218371, lng: -1.553621 },
  { name: "Strasbourg", lat: 48.573405, lng: 7.752111 },
  { name: "Montpellier", lat: 43.610769, lng: 3.876716 },
  { name: "Bordeaux", lat: 44.837789, lng: -0.57918 },
  { name: "Lille", lat: 50.62925, lng: 3.057256 },
  { name: "Rennes", lat: 48.117266, lng: -1.677793 },
  { name: "Reims", lat: 49.258329, lng: 4.031696 },
  { name: "Le Havre", lat: 49.49437, lng: 0.107929 },
  { name: "Saint-Étienne", lat: 45.439695, lng: 4.387178 },
  { name: "Toulon", lat: 43.124228, lng: 5.928 },
  { name: "Angers", lat: 47.478419, lng: -0.563166 },
  { name: "Grenoble", lat: 45.188529, lng: 5.724524 },
  { name: "Dijon", lat: 47.322047, lng: 5.04148 },
  { name: "Nîmes", lat: 43.836699, lng: 4.360054 },
  { name: "Aix-en-Provence", lat: 43.529742, lng: 5.447427 },
];

export const useGetCitiesByKeyWord = (
  value: string,
  setIsLoadingInProcess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [localData, setLocalData] = useState<any>([]);

  useEffect(() => {
    if (value.length > 0) {
      setIsLoadingInProcess(true);
      setTimeout(() => {
        setIsLoadingInProcess(false);
        const preparedValue = value.toLowerCase();
        const filteredData = cities.filter((item: CityType) =>
          item.name.toLowerCase().includes(preparedValue)
        );
        setLocalData(filteredData);
      }, 2000);
    } else {
      setLocalData([]);
    }
  }, [setIsLoadingInProcess, value]);

  return localData;
};

export const useGetCities = () => {
  return cities;
};
