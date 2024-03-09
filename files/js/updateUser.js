'use server'
import { cookies } from "next/headers";

export async function updateUser(type, value, passOld) {
  const email = 'demo@mbd.one' //cookieList.get('email')
  const password = passOld ?? 'mbd#' //cookieList.get('password')

  const res = await fetch('http://localhost:3000/api/profile/update', {
    method: "POST",
    body: JSON.stringify({email, pass: password, type, value}),
    headers: {
      "content-type": "application/json",
    }
  })
  const reso = await res.json();
  if(type == "pass" && !res.error)
    cookies().set("password", value)
  return reso
}