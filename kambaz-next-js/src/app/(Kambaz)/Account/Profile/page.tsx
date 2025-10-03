import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h1>Profile</h1>
      <Form.Control
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <Form.Control
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Form.Control
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
      />
      <Form.Control
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
      />
      <Form.Control
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <Form.Control
        id="wd-email"
        defaultValue="alice@wonderland.com"
        type="email"
        placeholder="email"
        className="mb-2"
      />
      <Form.Select
        id="wd-role"
        defaultValue="USER"
        className="mb-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select>
      <Link
        id="wd-signout-btn"
        href="/Account/Signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}