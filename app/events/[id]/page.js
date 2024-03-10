'use client'

import { useState, useEffect } from "react";

import Error404 from "@/app/error404";
import Loading from "@/app/loading";

import scss from "@/files/css/base/colors.module.scss"
import c from "@/files/css/pages/event-page.module.scss"

export default function EventPage({ params }) {
  const [eventData, setEventData] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isVol, setIsVol] = useState(false);

  const getEvent = async () => {
    const res = await fetch("/api/events/list/get", {
      method: "POST",
      body: JSON.stringify({ id: params.id })
    })
    const reso = await res.json();
    console.log(reso)
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

  const enroll = async (type) => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");
    const event_id = eventData.$id;
    const res = await fetch("/api/events/enroll/join", {
      method: "POST",
      body: JSON.stringify({ email, pass: password, event: event_id, type })
    })
    const reso = await res.json()
    setEventData({ ...reso.response })
  }

  console.log(eventData);
  return isLoading ? <Loading /> :
    !eventData.name ? <Error404 /> :
      <main className={c.event_page}>
        <div>
          <img src={eventData.image} alt={eventData.name} />
          <h1>{eventData.name}</h1>
          <h6>{"Locatie: " + eventData.city + " - " + eventData.location}</h6>
          <h6>{
            "Data: " + eventData.date.split(":")[0] +
            ((" - " + eventData.date.split(":")[1]) || "") +
            " - " + eventData.start
          }</h6>
          <h6>{"Prezentat de: " + eventData.author}</h6>
          <br />
          <p>{eventData.desc}</p>
          <br />

          {!(eventData.users.filter((ee) => JSON.parse(ee).type == "user").length > 0) ? "" :
            <>
              <p>Participanti inscrisi:</p>
              <div className={c.profiles}>
                {eventData.users.filter((ee) => JSON.parse(ee).type == "user").map((ee) =>
                  <img src={JSON.parse(ee).image} alt="" />
                )}
              </div>
            </>
          }
          {!user.email ? "" :
            <button type="button" onClick={() => { enroll("user") }}>Inscrie-te</button>
          }
          <br />


          {!JSON.parse(user.vol || "{}").short_desc ? "" :
            <>
              {!(eventData.users.filter((ee) => JSON.parse(ee).type == "volunteer").length > 0) ? "" :
                <>
                  <p>Voluntari aplicanti:</p>
                  <div className={c.profiles}>
                    {eventData.users.filter((ee) => JSON.parse(ee).type == "volunteer").map((ee) =>
                      <img src={JSON.parse(ee).image} alt="" />
                    )}
                  </div>
                </>
              }
              <button type="button" onClick={() => { enroll("volunteer") }}>Aplica ca voluntar</button>
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
        </div>
      </main>

}