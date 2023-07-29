import { useEffect, useState } from 'react';

const defaultImage = require('../assets/images/home/default.png');

function HomeContainer(props) {
  const [image, setImage] = useState(defaultImage);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  return (
    <div className="home_container">
      <div
        className="home_background"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="home_content_container">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="home_content">
                <div className="home_title ">
                  {title}
                  <span>.</span>
                </div>
                <div className="home_text">
                  <p>{content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
