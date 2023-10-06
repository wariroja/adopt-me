import { useState, useEffect } from 'react';

const localCache = {};//

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded")

useEffect(() => {
  if (!animal) {
    setBreedList([]); //if animal is null or undefined  
  } else if (localCache[animal]) {
    setBreedList(localCache[animal])
  } else {
    requestBreedList();
  }

  async function requestBreedList() {
    setBreedList([]);
    setStatus("loading");
    const res = await fetch(
      `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    console.log(res)
    const json = await res.json();
    localCache[animal] = json.breeds || [];
    setBreedList(json.breeds);
    setStatus("loaded");
  }
}, [animal])

  return [breedList, status];
}