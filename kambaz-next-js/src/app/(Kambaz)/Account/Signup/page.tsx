import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h1>Signup</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Form.Control
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
      />
      <Link
        id="wd-signup-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Link>
      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}