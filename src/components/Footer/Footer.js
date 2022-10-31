import React from "react";

const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
});

export default Footer;
