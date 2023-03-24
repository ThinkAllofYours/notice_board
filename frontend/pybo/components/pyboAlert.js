import { Alert } from "react-bootstrap";
import { useState } from "react";

export default function PyboAlert({ variant, children }) {
  const [show, setShow] = useState(true);
  return (
    <>
      <Alert show={show} variant={variant} onClick={()=>setShow(false)} dismissible>{children}</Alert>
    </>
  )
}
