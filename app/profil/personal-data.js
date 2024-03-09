'use client'
import { useState } from "react";

import c from "@/files/css/pages/profile.module.scss";

import scss from "@/files/css/base/colors.module.scss";
import ImgGradient from "@/files/components/img-gradient";

export default function PersonalData({ repo }) {
  console.log(repo);
  const profile = {
    name: "NAME",
    first_name: "Prenume Prenume2",
    img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    email: "kaka@kaka.com",
    phone: "089786656",
    fb: "wsdef",
    ig: "qsdff",
  }

  const [editPhone, setEditPhone] = useState(false);
  const [editFb, setEditFb] = useState(false);
  const [editIg, setEditIg] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const updateProfile = () => {
    alert(1);
  }

  return (
    <div className={c.personal_data}>
      {/* -------------------------------------- NAME & IMG --------------------------------------- */}
      <div className={c.name_container}>
        <img src={profile.img} alt="" />
        <div>
          <p className={c.name}>{profile.name}</p>
          <p className={c.first_name}>{profile.first_name}</p>
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
            type="text" defaultValue={profile.phone}
          />
          <button type="button" onClick={() => { if (editPhone) updateProfile(); setEditPhone(!editPhone) }}>
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
            type="text" defaultValue={profile.fb}
          />
          <button type="button" onClick={() => { if (editFb) updateProfile(); setEditFb(!editFb) }}>
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
            type="text" defaultValue={profile.ig}
          />
          <button type="button" onClick={() => { if (editIg) updateProfile(); setEditIg(!editIg) }}>
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
          <p style={{ width: "416px" }}>Change Password:</p>
          <button type="button" onClick={() => { setEditPass(!editPass) }}>
            <div className={c.normal}>
              <ImgGradient size="30px" alt="" c1={scss.txt1}
                src={editPass ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
            <div className={c.hover}>
              <ImgGradient size="30px" alt="" c1={scss.acc1} c2={scss.acc2}
                src={editPass ? "/icon_check.png" : "/icon_edit.png"}
              />
            </div>
          </button>
        </div>
        <div className={editPhone ? c.pass : `${c.pass} ${c.disabled}`}>
          <input type="password" placeholder="Parola veche..." />
          <input type="password" placeholder="Parola noua..." />
          <input type="password" placeholder="Repeta parola noua..." />
          <button type="button">Trimite</button>
        </div>
        {/* ------------------------------------------------------------------------------------ */}
      </div>

    </div>
  );
}