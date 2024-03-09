"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

import ImgGradient from "@/files/components/img-gradient";

import c from "@/files/css/pages/menu.module.scss";

import scss from "@/files/css/base/colors.module.scss";

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className={c.menu}>
      <Link className={pathname === "/" ? c.active : ""} href="/">
        <ImgGradient src="/icon_events.png" alt="" size="40px" angle="120deg"
          c1={pathname === "/" ? scss.bg1 : scss.acc1}
          c2={pathname === "/" ? scss.bg1 : scss.acc2}
        />
        <p>Evenimente</p>
      </Link>
      <Link className={pathname === "/exploreaza" ? c.active : ""} href="/exploreaza">
        <ImgGradient src="/icon_explore.png" alt="" size="40px" angle="120deg"
          c1={pathname === "/exploreaza" ? scss.bg1 : scss.acc1}
          c2={pathname === "/exploreaza" ? scss.bg1 : scss.acc2}
        />
        <p>Explorează</p>
      </Link>
      <Link className={pathname === "/profil" || pathname === "/login" || pathname === "/register" ? c.active : ""} href="/profil">
        <ImgGradient src="/icon_profile.png" alt="" size="40px" angle="120deg"
          c1={pathname === "/profil" || pathname === "/login" || pathname === "/register" ? scss.bg1 : scss.acc1}
          c2={pathname === "/profil" || pathname === "/login" || pathname === "/register" ? scss.bg1 : scss.acc2}
        />
        <p>Profil</p>
      </Link>
    </nav>
  )
}