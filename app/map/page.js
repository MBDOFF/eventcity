"use client";

import { useEffect, useState } from "react";
import Map from "@/files/components/Map";
import c from "@/files/css/pages/events.module.scss"
import HTMLReactParser from "html-react-parser";

export default function MapPage() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const res = await fetch("/api/events/list/all");
    const reso = await res.json();
    setEvents([...reso]);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main>
      <Map width="800" height="400" center={[45.75372, 21.22571]} zoom={15}>
        {({ TileLayer, Marker, Popup }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {events.map((event, index) => (
              <Marker
                key={event.id}
                position={[
                  event.coords.split(",")[0],
                  event.coords.split(",")[1],
                ]}
              >
                <Popup>
                  <div
                    key={index}
                    className={c.event}
                    style={{ backgroundImage: 'url("' + event.image + '")' }}
                    onClick={() => {
                      router.push("/events/" + event.$id);
                    }}
                  >
                    <div className={c.gr2}></div>
                    <div className={c.gr1}></div>
                    <div></div>
                    <h1>{event.name}</h1>
                    <p>
                      {HTMLReactParser(
                        event.tags +
                          "<br/>" +
                          event.city +
                          " - " +
                          event.location +
                          "<br/>" +
                          event.date.slice(0, 10) +
                          " - " +
                          event.start
                      )}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </Map>
    </main>
  );
}
