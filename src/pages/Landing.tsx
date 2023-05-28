import * as React from 'react';
import { Link, redirect } from 'react-router-dom';

const Landing: React.FC = () => {
  const [fadeOut, setFadeOut] = React.useState(false);

  const handleButtonClick = () => {
    setFadeOut(true);
    setTimeout(async () => {
      return redirect('/niches');
    }, 100);
  };
  return (
    <>
      <div className={`fade ${fadeOut ? 'out' : ''}`}>
        <h1>AI Website Niche Finder!</h1>
        <Link to="/form">
          <button onClick={handleButtonClick}>Get Started!</button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
