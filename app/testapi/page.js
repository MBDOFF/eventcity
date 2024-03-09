"use client";
import { useState, useEffect } from "react";

export default function TestApi() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { email, pass, phone, name, type, value };

    try {
      const res = await fetch("http://localhost:3000/api/profile/login", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(await res.json());
      if (res.ok) {
        console.log("Yeai!");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="type"
        ></input>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
        ></input>
        <input type="submit"></input>
      </form>
    </main>
  );
}
