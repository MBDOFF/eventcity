import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import c from "@/files/css/pages/profile.module.scss";

import PersonalData from "./personal-data";
import AdditionalOptions from "./additional-options";

import { login } from "@/files/js/login";

export async function getData() {
  return await login();
}

export default async function Explore() {
  const data = await getData()
  // const data = {
  //   name: "NAME",
  //   first_name: "Prenume Prenume2",
  //   img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
  //   email: "kaka@kaka.com",
  //   phone: "089786656",
  //   fb: "wsdef",
  //   ig: "qsdff",
  // }
  if(!data.user) redirect('/login');

  const socials = JSON.parse(data.user.socials);
  data.user.fb = socials.fb
  data.user.ig = socials.ig

  return(
    <main className={c.top_container}>
      <PersonalData profile={data.user} />
      <AdditionalOptions profile={data.user} />
    </main>
  );
}
