import c from "@/files/css/pages/events.module.scss"
import HTMLReactParser from "html-react-parser"
import Link from "next/link"

export default function Cards({ featured }) {
  return (
    <div className={c.cards}>
      <div className={c.banner}>
        <div><p>EVENT<br />CITY</p></div>
        <div><p>EVENT<br />CITY</p></div>
      </div>
      <Link className={c.today} style={{ backgroundImage: "url(" + featured.image + ")" }}
        href={"/events/" + featured.$id}
      >
        <div className={c.gr1}></div>
        <div className={c.gr2}></div>
        <h3>Participa acum!</h3>
        <p>{HTMLReactParser(
          featured.name + "<br/>" +
          "<span>" +
          featured.location + "<br/>" +
          "</span>"
        )}</p>
      </Link>
    </div>
  )
}