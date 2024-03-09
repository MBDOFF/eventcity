'use server'

import { cookies } from "next/headers"

export async function login( emailProp, passwordProp ) {
  const email = emailProp ?? cookies().get('email').value
  const password = passwordProp ?? cookies().get('password').value

  const res = await fetch('http://localhost:3000/api/profile/login', {
    method: "POST",
    body: JSON.stringify({email, pass: password}),
    headers: {
      "content-type": "application/json",
    }
  })
  const reso = await res.json()
  if(reso.user) {
    cookies().set("email", email)
    cookies().set("password", password)
  }
  return reso;
}