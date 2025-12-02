"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page"; // or wherever your PeopleTable component is
import * as client from "../../client";

export default function PeoplePage() {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (cid) {
      try {
        const courseUsers = await client.findUsersForCourse(cid as string);
        setUsers(courseUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}