import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <p>&copy; {new Date().getFullYear()} Réalisé par TAYOUB Soumaya.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
