'use client'
import { useEffect, useState, useRef } from "react"

import EventsComp from "@/app/events/events";
import ImgGradient from "@/files/components/img-gradient";

import scss from "@/files/css/base/colors.module.scss"
import c from "@/files/css/pages/events.module.scss"

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageStatus, setPageStatus] = useState(false);

  const refCity = useRef();
  const refTime1 = useRef();
  const refTime2 = useRef();

  const getEvents = async () => {
    if(pageStatus == "byCity") {
      const res = await fetch("/api/events/list/city", {
        method: "POST",
        body: JSON.stringify({city: refCity.current.value})
      })
      const reso = await res.json()
      console.log(reso);
      setEvents([...reso]);
      setTags({...tags});
    }
    else if(pageStatus == "byTime") {
      const d1 = new Date(refTime1.current.value);
      const d2 = new Date(refTime2.current.value);
      const res = await fetch("/api/events/list/interval", {
        method: "POST",
        body: JSON.stringify({
          date: d1.getDate() + "." + (d1.getMonth()+1) + "." + d1.getFullYear(),
          date2: d2.getDate() + "." + (d2.getMonth()+1) + "." + d2.getFullYear(),
        })
      })
      const reso = await res.json()
      console.log(reso);
      setEvents([...reso]);
    }
  }
  const getPrefs = async () => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");
    const res = await fetch("/api/profile/login", {
      method: "POST",
      body: JSON.stringify({ email, pass: password })
    })
    const reso = await res.json()
    if (reso.error) getTags()
    else setTags({ ...JSON.parse(reso.user.prefs).tags })
  }
  const getTags = async () => {
    const res = await fetch("/api/events/tags")
    const reso = await res.json()
    const tagsReduced = reso.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {});
    setTags({ ...tagsReduced })
  }

  useEffect(() => {
    getEvents()
    getPrefs()
  }, [])

  const toggleTag = (tag) => {
    let tags2 = tags;
    tags2[tag] = !tags2[tag];
    setTags({ ...tags2 });
  }

  return (
    <main>
      {pageStatus ?
        <div className={c.container_top}>
          <div className={c.tags}>
            {Object.keys(tags).map((tag) =>
              <div className={tags[tag] ? `${c.tag} ${c.active}` : c.tag} onClick={() => { toggleTag(tag) }} key={tag}>
                <ImgGradient size="15px" alt="" c1={tags[tag] ? scss.bg1 : scss.txt1}
                  src={tags[tag] ? "/icon_check.png" : "/icon_x.png"}
                />
                <p>{tag}</p>
              </div>
            )}
          </div>
          <div className={c.container_mid}>
            <EventsComp events={events} tags={tags} />
            <div className={c.selectors}>
              {pageStatus == "byCity" ?
                <select ref={refCity} onChange={() => {getEvents()}}>
                  <option value="bucuresti">Bucuresti</option>
                  <option value="timisoara">Timisoara</option>
                  <option value="cluj-napoca">Cluj-Napoca</option>
                  <option value="brasov">Brasov</option>
                  <option value="oradea">Oradea</option>
                  <option value="craiova">Craiova</option>
                  <option value="iasi">Iasi</option>
                  <option value="constanta">Constanta</option>
                  <option value="sibiu">Sibiu</option>
                  <option value="galati">Galati</option>
                  <option value="targu-mures">Targu-Mures</option>
                </select>
                : pageStatus == "byTime" ?
                  <div>
                    <input type="date" ref={refTime1} onChange={() => {getEvents()}} />
                    <input type="date" ref={refTime2} onChange={() => {getEvents()}} />
                  </div>
                  : ""
              }
            </div>
          </div>
        </div>
        :
        <div className={c.explore_options_container}>
          <div className={c.option} onClick={() => {setPageStatus("byTime")}} style={{marginRight: "100px"}}>
            <ImgGradient src="/icon_search_by_time.png" size="120px" c1={scss.acc1} c2={scss.acc2} />
            <h2>Cauta dupa perioada</h2>
          </div>
          <div className={c.option} onClick={() => {setPageStatus("byCity")}}>
            <ImgGradient src="/icon_search_by_time.png" size="120px" c1={scss.acc1} c2={scss.acc2} />
            <h2>Cauta dupa locatie</h2>
          </div>
        </div>
      }
    </main>
  )
}
