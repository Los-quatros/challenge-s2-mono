import { ToastContainer, toast } from "react-toastify";
import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import contactPageBackground from "../assets/images/contact/contact.png";

function ContactPage() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const recaptchaRef = useRef();

  /**
   * Trigger on last name input change
   * @param { Event } event Input last name event
   */
  const onLastNameChange = (event) => setLastName(event.target.value);

  /**
   * Trigger on first name input change
   * @param { Event } event Input first name event
   */
  const onFirstNameChange = (event) => setFirstName(event.target.value);

  /**
   * Trigger on subject input change
   * @param { Event } event Input subject event
   */
  const onSubjectChange = (event) => setSubject(event.target.value);

  /**
   * Trigger on message input change
   * @param { Event } event Input message event
   */
  const onMessageChange = (event) => setMessage(event.target.value);

  /**
   * Trigger on captcha change
   * @param { String } value Captcha value
   */
  const onCaptchaChange = (value) => {
    if (!value) {
      setIsCaptchaVerified(false);
    } else {
      setIsCaptchaVerified(true);
    }
  };

  /**
   * Display toast message
   * @param { String } message Toast message
   * @param { String } type Toast type
   */
  const setToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        setTimeout(() => {
          setIsToastActive(false);
        }, 2000);
      },
    });
  };

  /**
   * Trigger on form submit to send message
   * @param { Event } event Form submit event
   * TODO : Send message from API
   * TODO : Display toaster success message
   * TODO : Display toaster error message
   */
  const sendMessage = (event) => {
    event.preventDefault();
    if (
      lastName === "" ||
      firstName === "" ||
      subject === "" ||
      message === "" ||
      !isCaptchaVerified
    ) {
      if (!isToastActive) {
        setIsToastActive(true);
        setToast("Veuillez remplir tous les champs", "info");
      }
    } else {
      setToast("Votre message a bien été envoyé", "success");
      setLastName("");
      setFirstName("");
      setSubject("");
      setMessage("");
      setIsCaptchaVerified(false);
      recaptchaRef.current.reset();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="home">
        <div className="home_container">
          <div
            className="home_background"
            style={{ backgroundImage: `url(${contactPageBackground})` }}
          ></div>
          <div className="home_content_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="home_content">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <Link to="/" className="text-dark">
                            Accueil
                          </Link>
                        </li>
                        <li className="active font-weight-bold">Contact</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-12 contact_col">
              <div className="get_in_touch">
                <div className="section_title">Contactez-nous</div>
                <div className="contact_form_container">
                  <form
                    action="#"
                    id="contact_form"
                    className="contact_form"
                    onSubmit={sendMessage}
                  >
                    <div className="row">
                      <div className="col-xl-6">
                        <label htmlFor="contact_name">
                          Nom<span>*</span>
                        </label>
                        <input
                          type="text"
                          id="contact_name"
                          className="contact_input"
                          required
                          onChange={onLastNameChange}
                          value={lastName}
                        />
                      </div>
                      <div className="col-xl-6 last_name_col">
                        <label htmlFor="contact_last_name">
                          Prénom<span>*</span>
                        </label>
                        <input
                          type="text"
                          id="contact_last_name"
                          className="contact_input"
                          required
                          onChange={onFirstNameChange}
                          value={firstName}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact_company">
                        Sujet<span>*</span>
                      </label>
                      <input
                        type="text"
                        id="contact_company"
                        className="contact_input"
                        onChange={onSubjectChange}
                        value={subject}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact_textarea">
                        Message<span>*</span>
                      </label>
                      <textarea
                        id="contact_textarea"
                        className="contact_input contact_textarea"
                        required
                        onChange={onMessageChange}
                        value={message}
                      ></textarea>
                    </div>
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_CAPTCHA_SECRET_KEY}
                      onChange={onCaptchaChange}
                      ref={recaptchaRef}
                    />
                    ,
                    <button className="button contact_button">
                      <span>Envoyer</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row map_row">
            <div className="col">
              <div className="map">
                <div id="google_map" className="google_map">
                  <div className="map_container">
                    <div id="map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916299873003!2d2.289610393129398!3d48.85836999741444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1687686343295!5m2!1sen!2sfr"
                        width="100%"
                        height="100%"
                        title="Google map de la tour Eiffel"
                        style={{ border: "0" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
