'use client'

import { useState, useEffect } from "react";

import Error404 from "@/app/error404";
import Loading from "@/app/loading";


export default function EventPage({ params }) {
  const [eventData, setEventData] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEvent = async () => {
    const res = await fetch("/api/events/list/get", {
      method: "POST",
      body: JSON.stringify({ id: params.id })
    })
    const reso = await res.json();
    setEventData({ ...reso });
    setIsLoading(false);
  }
  const login = async () => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");
    const res = await fetch("/api/profile/login", {
      method: "POST",
      body: JSON.stringify({ email, pass: password }),
    })
    const reso = await res.json()
    console.log(reso.user)
    setUser({ ...reso.user })
  }

  useEffect(() => {
    getEvent();
    login();
  }, [])


  return isLoading ? <Loading /> :
    !eventData.user.name ? <Error404 /> :
      <main>
        <img src={eventData.image} alt={eventData.name} />
        <h1>{eventData.name}</h1>
        <h6>{"Locatie: " + eventData.city + " - " + eventData.location}</h6>
        <h6>{
          "Data: " + eventData.date.split(":")[0] +
          (eventData.date.split(":")[1] ? (" - " + eventData.date.split(":")[1]) : "") +
          + " - " + eventData.start
        }</h6>
        <h6>{"Prezentat de: " + eventData.author}</h6>
        <br />
        <p>{eventData.desc}</p>
        <br />

        <p>Participanti inscrisi:</p>
        <div className={c.profiles}>
          {JSON.parse(eventData.users).filter((ee) => ee.type == "user").map((ee) =>
            <img src={ee.image} alt="" />
          )}
        </div>
        {!user ? "" :
          <button type="button">Inscrie-te</button>
        }

        {!user.vol ? "" :
          <>
            <div className={c.profiles}>
              {JSON.parse(eventData.users).filter((ee) => ee.type == "volunteer").map((ee) =>
                <img src={ee.image} alt="" />
              )}
            </div>
            <button type="button">Aplica ca voluntar</button>
          </>
        }

        {/* 
          [
            {
              user: id
              type: user/volunteer
              status: pending/accepted/denied  
            }
          ]
      */}
      </main>

}