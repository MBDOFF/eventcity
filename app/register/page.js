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

  const login = async (emailProp, passwordProp) => {
    const email = emailProp ?? sessionStorage.getItem('email')
    const password = passwordProp ?? sessionStorage.getItem('password')

    const res = await fetch('/api/profile/login', {
      method: "POST",
      body: JSON.stringify({ email, pass: password }),
      headers: {
        "content-type": "application/json",
      }
    })
    const reso = await res.json()
    if (reso.user) {
      sessionStorage.setItem("email", email)
      sessionStorage.setItem("password", password)
      router.push('/profil')
    }
    else if (emailProp && passwordProp) alert("Invalid")
  }

  useEffect(() => {
    login();
  }, [])

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
        <button type="button" onClick={() => { login(refEmail.current.value, refPass.current.value) }}>Inregistreaza-te</button>
        <p onClick={() => {router.push("/register")}}>Nu ai cont? Inregistreaza-te</p>
      </div>
    </main>
  )
}