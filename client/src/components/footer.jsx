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
        <p>© {new Date().getFullYear()} - Ecommerce software by Yassin</p>
      </div>
    </>
  );
}
export default Footer;
