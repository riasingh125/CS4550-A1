/* eslint-disable @typescript-eslint/no-explicit-any */
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        throw new Error("No currentUser returned");
      }
    } catch (err: any) {
      console.warn("Session fetch failed, restoring from localStorage...");
      const localUser = localStorage.getItem("currentUser");
      if (localUser) {
        dispatch(setCurrentUser(JSON.parse(localUser)));
      } else {
        console.error("No user found in localStorage.");
      }
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div className="text-center mt-5">Loading session...</div>;
  }

  return children;
}
