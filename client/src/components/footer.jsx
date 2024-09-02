import { Link } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <>
      <div className="footer">
        <section>
          <h1>Contact</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </section>
        <section>
          <h1>Information</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </section>
        <section>
          <h1>Our Company</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </section>
        <section>
          <h1>Quick Links</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </section>
      </div>
      <div className="CopyWrite">
        <p>
          © {new Date().getFullYear()} - E-commerce software by{" "}
          <Link
            color={"inherit"}
            target="_blank"
            href="https://www.linkedin.com/in/yassin-samir/"
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            {" "}
            Yassin Samir
          </Link>
        </p>
      </div>
    </>
  );
}
export default Footer;
