'use client'

import c from "@/files/css/pages/login.module.scss"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const refEmail = useRef();
  const refPass = useRef();
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
        <input type="text" ref={refEmail} />
        <input type="password" ref={refPass} />
        <button type="button" onClick={() => { login(refEmail.current.value, refPass.current.value) }}>Login</button>
      </div>
    </main>
  )
}