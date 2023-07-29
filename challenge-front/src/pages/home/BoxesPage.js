import icon1 from '../../assets/images/home/boxes/box_1.svg';
import icon2 from '../../assets/images/home/boxes/box_2.svg';
import icon3 from '../../assets/images/home/boxes/box_3.svg';

function BoxesPage() {
  return (
    <div className="icon_boxes">
      <div className="container">
        <div className="row icon_box_row">
          <div className="col-lg-4 icon_box_col">
            <div className="icon_box">
              <div className="icon_box_image">
                <img src={icon1} alt="Icône d'expédition" />
              </div>
              <div className="icon_box_title">Expédition</div>
              <div className="icon_box_text">
                <p>
                  Un envoi rapide et international pour vous accompagner partout
                  dans le monde.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 icon_box_col">
            <div className="icon_box">
              <div className="icon_box_image">
                <img src={icon2} alt="Icône de retours" />
              </div>
              <div className="icon_box_title">Retours</div>
              <div className="icon_box_text">
                <p>
                  Profitez de retours gratuits et sans tracas pour une
                  expérience d'achat en toute sérénité.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 icon_box_col">
            <div className="icon_box">
              <div className="icon_box_image">
                <img src={icon3} alt="Icône de support" />
              </div>
              <div className="icon_box_title">Support</div>
              <div className="icon_box_text">
                <p>
                  Notre équipe de support dévouée est là pour vous aider à tout
                  moment pour toute question.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxesPage;
