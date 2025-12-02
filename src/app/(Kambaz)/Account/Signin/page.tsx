"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
 interface Credentials {
   username: string;
   password: string;
 }

 const [credentials, setCredentials] = useState<Partial<Credentials>>({});
 const dispatch = useDispatch();
 const signin = async () => {
  console.log("Trying signin with:", credentials);
  const user =  await client.signin(credentials);
  if (!user) return;
  dispatch(setCurrentUser(user));
  redirect("/Dashboard");
};

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
          value={credentials.username || ""}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-2"
          placeholder="username"
          id="wd-username"
        />

        <FormControl
          value={credentials.password || ""}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-2"
          placeholder="password"
          type="password"
          id="wd-password"
        />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" href="/Account/Signup"> Sign up </Link>
    </div>
);}
