'use client'

import c from "@/files/css/pages/login.module.scss"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const refNume = useRef();
  const refPrenume = useRef();
  const refEmail = useRef();
  const refTel = useRef();
  const refPassNew1 = useRef();
  const refPassNew2 = useRef();
  const router = useRouter();

  const register = async () => {
    const name = refNume.current.value;
    const first_name = refPrenume.current.value;
    const email = refEmail.current.value;
    const tel = refTel.current.value;
    const password = refPassNew1.current.value;
    if (!name || !first_name || !email || !tel || !password)
      alert("Date incomplete")
    else if (refPassNew1.current.value != refPassNew2.current.value)
      alert("Parolele nu coincid");
    else {
      const res = await fetch('/api/profile/register', {
        method: "POST",
        body: JSON.stringify({ name, prenume: first_name, email, phone: tel, pass: password }),
        headers: {
          "content-type": "application/json",
        }
      })
      const reso = await res.json()
      if (reso.error) alert("Email-ul a fost deja folosit")
      else {
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("password", password)
        router.push('/profil')
      }
    }
  }

  return (
    <main className={c.login_container}>
      <div className={c.login}>
        <h1>EVENTCITY</h1>
        <input type="text" ref={refNume} placeholder="Nume..." />
        <input type="text" ref={refPrenume} placeholder="Prenume..." />
        <input type="text" ref={refEmail} placeholder="Email..." />
        <input type="tel" ref={refTel} placeholder="Nr. Telefon..." />
        <input type="password" ref={refPassNew1} placeholder="Parola..." />
        <input type="password" ref={refPassNew2} placeholder="Reintrodu parola..." />
        <button type="button" onClick={register}>Inregistreaza-te</button>
        <p onClick={() => { router.push("/login") }}>Ai deja cont? Logheaza-te</p>
      </div>
    </main>
  )
}