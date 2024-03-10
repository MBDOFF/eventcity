import c from "@/files/css/pages/events.module.scss"

export default function Cards({ featured }) {
  return (
    <div className={c.cards}>
      <div className={c.banner}>
        <div><p>EVENT<br />CITY</p></div>
        <div><p>EVENT<br />CITY</p></div>
      </div>
      <div className={c.today} style={{ backgroundImage: "url(" + featured.image + ")" }}>
        <h3>Participa acum!</h3>
        <p>{featured.name}</p>
      </div>
    </div >
  )
}