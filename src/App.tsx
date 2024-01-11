import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface DataCat {
  "breeds": [],
  "id": string,
  "url": string,
  "width": number,
  "height": number,
  "pending": number,
  "approved": number,
  "rejected": number
}

const App: React.FC = () => {
  const [data, setData] = useState<DataCat[]>([]);
  const url = 'https://api.thecatapi.com';

  const headers = {
    'x-api-key': import.meta.env.VITE_APP_API_KEY,
    'Content-Type': 'application/json',
  };

  // Function to fetch data from the API
  const getProduct = async () => {
    try {
      const response: AxiosResponse<DataCat[]> = await axios.get(`${url}/v1/images/search?format=json`, { headers });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the getProduct function when the component mounts
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h1>Cat Data</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.id}</h3>
          <p>Price: ${item.width}</p>
          <p>Category: {item.height}</p>
          <p>Description: {item.url}</p>
          <img src={item.url} alt={item.id} />
        </div>
      ))}
    </div>
  );
};

export default App
