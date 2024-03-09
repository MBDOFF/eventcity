'use client'

import { useRef } from "react";

import { login } from "@/files/js/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const refEmail = useRef();
  const refPass = useRef();
  const router = useRouter();

  const sendLogin = async () => {
    const res = await login(refEmail.current.value, refPass.current.value);

    if(res.user) router.push('/profil')
    else alert("Invalid")
  }

  return (
    <main>
      <input type="text" ref={refEmail} />
      <input type="password" ref={refPass} />
      <button type="button" onClick={sendLogin}>Login</button>
    </main>
  )
}