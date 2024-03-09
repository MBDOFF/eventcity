import c from "@/files/css/pages/profile.module.scss";

import PersonalData from "./personal-data";
import AdditionalOptions from "./additional-options";

export async function getServerSideProps() {
  const cookieList = cookies()
  const email = cookieList.get('email')
  const password = cookieList.get('password')

  const res = await fetch('/api/profile/login', {
    body: JSON.stringify({email: email, pass: password}),
  })
  const repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}

export default function Explore({ repo }) {
  return (
    <main className={c.top_container}>
      <PersonalData repo={repo} />
      <AdditionalOptions />
    </main>
  );
}
