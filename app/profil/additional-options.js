'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ImgGradient from "@/files/components/img-gradient";

import scss from "@/files/css/base/colors.module.scss";
import c from "@/files/css/pages/profile.module.scss";

export default function AdditionalOptions({ profile }) {
  const router = useRouter()
  const refVolShortDesc = useRef()
  const refVolSkills = useRef()
  const refVolExp = useRef()

  const [tags, setTags] = useState(JSON.parse(profile.prefs).tags);
  const vol = JSON.parse(profile.vol);
  const [isVol, setIsVol] = useState(vol.short_desc ? true : false);
  const [op, setOp] = useState([]);

  const updateUser = async (type, value, passOld) => {
    const email = sessionStorage.getItem('email')
    const password = passOld ?? sessionStorage.getItem('password')

    const res = await fetch('/api/profile/update', {
      method: "POST",
      body: JSON.stringify({ email, pass: password, type, value }),
      headers: {
        "content-type": "application/json",
      }
    })
    const reso = await res.json();
    if (type == "pass" && !res.error)
      sessionStorage.setItem("password", value)
    return reso
  }

  const getOperator = async () => {
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')

    const res = await fetch('/api/events/list/own', {
      method: "POST",
      body: JSON.stringify({ email, pass: password }),
      headers: {
        "content-type": "application/json",
      }
    })
    const reso = await res.json();
    console.log(reso);
    setOp(reso);
  }
  useEffect(() => {
    if (profile.op) getOperator();
  }, [])

  const toggleTag = (tag) => {
    let tags2 = tags;
    tags2[tag] = !tags2[tag];
    setTags({ ...tags2 });
    console.log(tag, tags);

    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')
    fetch('/api/profile/update', {
      method: "POST",
      body: JSON.stringify({ email, pass: password, type: "prefs", value: { tags: tags } }),
      headers: {
        "content-type": "application/json",
      }
    })
  }

  return (
    <div className={c.additional_options}>
      {/* ------------------------------------------ TAGS -------------------------------------------- */}
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
      {/* ---------------------------------------- VOLUNTEER ------------------------------------------ */}
      {isVol ? <div className={c.volunteer}>
        <h1>Profil Voluntar</h1>
        <p>Scurta Descriere</p>
        <textarea ref={refVolShortDesc} defaultValue={vol.short_desc} style={{ height: "100px" }}></textarea>
        <p>Experienta</p>
        <textarea ref={refVolExp} defaultValue={vol.exp} style={{ height: "60px" }}></textarea>
        <p>Abilitati</p>
        <textarea ref={refVolSkills} defaultValue={vol.skills} style={{ height: "60px" }}></textarea>
        <button type="button" onClick={() => {
          updateUser("vol", {
            short_desc: refVolShortDesc.current.value,
            exp: refVolExp.current.value,
            skills: refVolSkills.current.value,
          })
        }}>Salveaza profil</button>
        <button type="button" onClick={() => { updateUser("vol", {}); setIsVol(false) }}>Sterge profil</button>
      </div> :
        <div className={c.volunteer}>
          <p className={c.devino_voluntar} onClick={() => { setIsVol(true) }}>Devino Voluntar</p>
        </div>}
      {/* ---------------------------------------- OPERATOR ------------------------------------------ */}
      {profile.op ?
        <div className={c.operator}>
          <h1>Profil Operator Evenimente</h1>
          <p>{profile.name + " " + profile.prenume}</p>
          {op.map((ee) =>
            <div className={c.event} style={{ backgroundImage: 'url("' + ee.image + '")' }}
              onClick={() => { router.push("/events/" + ee.$id) }}
            >
              <div></div>
              <h1>{ee.name}</h1>
              <p>{
                ee.location + " - " + ee.tags + "\n" +
                ee.date + " - " + ee.start
              }</p>
            </div>
          )}
          <button className={c.add_event}>Adauga Eveniment</button>
        </div> : ""}
      {/* -------------------------------------------------------------------------------------------- */}
    </div>
  );
}