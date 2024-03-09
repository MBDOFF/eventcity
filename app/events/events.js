import c from "@/files/css/pages/events.module.scss"
import { useEffect, useState } from "react"
import HTMLReactParser from "html-react-parser";

export default function Events({ events, tags }) {
  const [filteredEvents, setFilteredEvents] = useState([...events]);

  const filterEvents = () => {
    const fe = events.filter((ee) => tags[ee.tags])
    setFilteredEvents([...fe])
  }
  useEffect(() => { filterEvents() }, [tags])

  return (
    <div className={c.events}>
      {filteredEvents.map((ee) =>
        <div className={c.event} style={{ backgroundImage: 'url("' + ee.image + '")' }}
          onClick={() => { router.push("/events/" + ee.$id) }}
        >
          <div className={c.gr2}></div>
          <div className={c.gr1}></div>
          <div></div>
          <h1>{ee.name}</h1>
          <p>{HTMLReactParser(
            ee.tags + "<br/>" +
            ee.location + "<br/>" + 
            ee.date.slice(0, 10) + " - " + ee.start
          )}</p>
        </div>
      )}
    </div>
  )
}