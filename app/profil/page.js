'use client'

import c from "@/files/css/pages/profile.module.scss";

import PersonalData from "./personal-data";
import AdditionalOptions from "./additional-options";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Explore() {
  const router = useRouter()
  const [user, setUser] = useState({})

  const login = async ( emailProp, passwordProp ) => {
    const email = emailProp ?? sessionStorage.getItem('email')
    const password = passwordProp ?? sessionStorage.getItem('password')
  
    const res = await fetch('/api/profile/login', {
      method: "POST",
      body: JSON.stringify({email, pass: password}),
      headers: {
        "content-type": "application/json",
      }
    })
    const reso = await res.json()
    if(reso.user) {
      sessionStorage.setItem("email", email)
      sessionStorage.setItem("password", password)

      const socials = JSON.parse(reso.user.socials);
      reso.user.fb = socials.fb
      reso.user.ig = socials.ig
      setUser(reso.user);
    }
    else router.push('/login');
  }

  useEffect(() => {
    login();
  }, [])

  

  return(
    <main className={c.top_container}>
      <PersonalData profile={user} />
      <AdditionalOptions profile={user} />
    </main>
  );
}
