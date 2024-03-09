'use client'
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import c from "@/files/css/pages/profile.module.scss";

import scss from "@/files/css/base/colors.module.scss";
import ImgGradient from "@/files/components/img-gradient";

export default function PersonalData({ profile }) {
  const router = useRouter();

  const [editPhone, setEditPhone] = useState(false);
  const [editFb, setEditFb] = useState(false);
  const [editIg, setEditIg] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const refPhone = useRef();
  const refFb = useRef();
  const refIg = useRef();
  const refPassOld = useRef();
  const refPassNew1 = useRef();
  const refPassNew2 = useRef();

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

  const savePassword = async () => {
    if (refPassNew1.current.value == refPassNew2.current.value)
      if (refPassNew1.current.value != refPassOld.current.value)
        if (refPassOld.current.value) {
          const res = await updateUser("pass", refPassNew1.current.value, refPassOld.current.value)
          if (res.error) alert("Parola veche nu este corecta")
          else {
            refPassOld.current.value = ""
            refPassNew1.current.value = ""
            refPassNew2.current.value = ""
          }
        }
        else alert("Introduceti parola veche");
      else alert("Parola veche nu poate coincide cu cea noua");
    else alert("Parolele noi nu coincid");
  }

  const logout = () => {
    sessionStorage.setItem("email", "")
    sessionStorage.setItem("password", "")
    router.push("/login")
  }

  return (
    <div className={c.personal_data}>
      {/* -------------------------------------- NAME & IMG --------------------------------------- */}
      <div className={c.name_container}>
        <img src={profile.img} alt="" />
        <div>
          <p className={c.name}>{profile.name}</p>
          <p className={c.first_name}>{profile.prenume}</p>
        </div>
      </div>

      <div className={c.other_data}>
        {/* -------------------------------------- EMAIL --------------------------------------- */}
        <div>
          <p>Email:</p>
          <input className={c.disabled} disabled type="text" defaultValue={profile.email} />
        </div>
        {/* -------------------------------------- PHONE --------------------------------------- */}
        <div>
          <p>Phone:</p>
          <input className={editPhone ? "" : c.disabled} disabled={editPhone ? false : true}
            type="text" defaultValue={profile.phone} ref={refPhone}
          />
          <button type="button" onClick={() => { if (editPhone) updateUser("phone", refPhone.current.value); setEditPhone(!editPhone) }}>
            <div className={c.normal}>
              <ImgGradient size="30px" alt="" c1={scss.txt1}
                src={editPhone ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
            <div className={c.hover}>
              <ImgGradient size="30px" alt="" c1={scss.acc1} c2={scss.acc2}
                src={editPhone ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
          </button>
        </div>
        {/* -------------------------------------- FACEBOOK --------------------------------------- */}
        <div>
          <p>Facebook:</p>
          <input className={editFb ? "" : c.disabled} disabled={editFb ? false : true}
            type="text" defaultValue={profile.fb} ref={refFb}
          />
          <button type="button" onClick={() => { if (editFb) updateUser("fb", refFb.current.value); setEditFb(!editFb) }}>
            <div className={c.normal}>
              <ImgGradient size="30px" alt="" c1={scss.txt1}
                src={editFb ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
            <div className={c.hover}>
              <ImgGradient size="30px" alt="" c1={scss.acc1} c2={scss.acc2}
                src={editFb ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
          </button>
        </div>
        {/* -------------------------------------- INSTAGRAM --------------------------------------- */}
        <div>
          <p>Instagram:</p>
          <input className={editIg ? "" : c.disabled} disabled={editIg ? false : true}
            type="text" defaultValue={profile.ig} ref={refIg}
          />
          <button type="button" onClick={() => { if (editIg) updateUser("ig", refIg.current.value); setEditIg(!editIg) }}>
            <div className={c.normal}>
              <ImgGradient size="30px" alt="" c1={scss.txt1}
                src={editIg ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
            <div className={c.hover}>
              <ImgGradient size="30px" alt="" c1={scss.acc1} c2={scss.acc2}
                src={editIg ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
          </button>
        </div>
        {/* -------------------------------------- PASSWORD --------------------------------------- */}
        <div>
          <p style={{ width: "416px", marginTop: "5px",marginBottom: "12px" }}>Change Password:</p>
        </div>
        <div className={editPhone ? c.pass : `${c.pass} ${c.disabled}`}>
          <input type="password" ref={refPassOld} placeholder="Parola veche..." />
          <input type="password" ref={refPassNew1} placeholder="Parola noua..." />
          <input type="password" ref={refPassNew2} placeholder="Repeta parola noua..." />
          <button type="button" onClick={savePassword}>Trimite</button>
        </div>
        {/* ------------------------------------------------------------------------------------ */}
      </div>

      <div className={c.logout}>
        <button type="button" onClick={logout}>Logout</button>
      </div>

    </div>
  );
}