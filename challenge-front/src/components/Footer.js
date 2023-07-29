import { Link } from 'react-router-dom';
import footer from '../assets/images/footer/footer.png';

/**
 * Handle link click to prevent page reload
 * @param { Event } event Click event
 */
const handleLinkClick = (event) => event.preventDefault();

function Footer() {
  return (
    <>
      <div className="footer_overlay"></div>
      <footer className="footer">
        <div
          className="footer_background"
          style={{ backgroundImage: `url(${footer})` }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="footer_content d-flex flex-lg-row flex-column align-items-center justify-content-lg-start justify-content-center">
                <div className="footer_logo">
                  <Link to="/">ElecShop.</Link>
                </div>
                <div className="copyright ml-auto mr-auto">
                  Copyright &copy; Tous droits réservés par
                  <a
                    href="https://github.com/Los-quatros"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ml-1 no-hover">Los quatros</span>
                  </a>
                </div>
                <div className="footer_social ml-lg-auto">
                  <ul>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-pinterest" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleLinkClick}>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
