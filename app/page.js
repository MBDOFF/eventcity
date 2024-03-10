'use client'
import { useEffect, useState } from "react"

import EventsComp from "@/app/events/events";
import Cards from "@/app/events/cards";
import ImgGradient from "@/files/components/img-gradient";

import scss from "@/files/css/base/colors.module.scss"
import c from "@/files/css/pages/events.module.scss"

export default function Events() {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);

  const getEvents = async () => {
    const res = await fetch("/api/events/list/all")
    const reso = await res.json()
    setEvents([...reso]);
  }
  const getPrefs = async () => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");
    const res = await fetch("/api/profile/login", {
      method: "POST",
      body: JSON.stringify({ email, pass: password })
    })
    const reso = await res.json()
    console.log(reso)
    if (reso.error) getTags()
    else setTags({ ...JSON.parse(reso.user.prefs).tags })
  }
  const getTags = async () => {
    const res = await fetch("/api/events/tags")
    const reso = await res.json()
    const tagsReduced = reso.reduce((acc, tag) => {
      acc[tag] = false;
      return acc;
    }, {});
    console.log(tagsReduced)
    setTags({ ...tagsReduced })
  }
  const getFeatured = async () => {
    return "Hello World";
  }

  useEffect(() => {
    getEvents()
    getPrefs()
    //getFeatured()
  }, [])

  const toggleTag = (tag) => {
    let tags2 = tags;
    tags2[tag] = !tags2[tag];
    setTags({ ...tags2 });
  }

  return (
    <main>
      <div className={c.container_top}>
        <div className={c.tags}>
          {Object.keys(tags).map((tag) =>
            <div className={tags[tag] ? `${c.tag} ${c.active}` : c.tag} onClick={() => { toggleTag(tag) }}>
              <ImgGradient size="15px" alt="" c1={tags[tag] ? scss.bg1 : scss.txt1}
                src={tags[tag] ? "/icon_check.png" : "/icon_x.png"}
              />
              <p>{tag}</p>
            </div>
          )}
        </div>
        <div className={c.container_mid}>
          <EventsComp events={events} tags={tags} />
          <Cards featured={() => getFeatured()}/>
        </div>
      </div>
    </main>
  );
}
