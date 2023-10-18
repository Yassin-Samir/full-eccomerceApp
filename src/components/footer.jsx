import React from "react";

function Footer() {
  return (
    <>
      <div className="footer">
        <FooterSection>
          <h1>Contact</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </FooterSection>
        <FooterSection>
          <h1>Information</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </FooterSection>
        <FooterSection>
          <h1>Our Company</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </FooterSection>
        <FooterSection>
          <h1>Quick Links</h1>
          <p>Warehouse & Offices 12345 Street name, Cairo, EGYPT</p>
          <p>0123 456 789 / 0123 456 788</p>
          <p>demo@prestashop.com</p>
        </FooterSection>
      </div>
      <div className="CopyWrite">
        <p>© {new Date().getFullYear()} - Ecommerce software by Yassin</p>
      </div>
    </>
  );
}
function FooterSection({ children }) {
  return <section>{children}</section>;
}
export default Footer;
