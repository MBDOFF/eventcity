"use client";
import { useState, useEffect } from "react";

export default function TestApi() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { lat, lon };

    try {
      const res = await fetch("http://localhost:3000/api/events/list/near", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(await res.json());
      if (res.ok) {
        console.log("Yeai!");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="lat"
        />
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="lon"
        />
        
        <input type="submit"></input>
      </form>
    </main>
  );
}
