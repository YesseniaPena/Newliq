import React from 'react';
import PropTypes from 'prop-types';


const WelcomeView = ({ handleStart }) => (
  <main
    className="main simple-view"
  >
    <div
      className="simple-view__content"
    >
      <div
        className="simple-view__title"
      >
        {/* <Icon
          className="simple-view__title__icon"
          name="Liquor"
        /> */}
        <h1
          className="simple-view__title__text"
        >
          Local Liq's
        </h1>
      </div>

      <div
        className="simple-view__body"
      >
        <p
          className="simple-view__body__text"
        >
          Press below to search for a random Liquor nearby
        </p>

        <button
          className="simple-view__body__button"
          onClick={handleStart}
        >
          Pick your Liquor Store!! 
        </button>
      </div>
    </div>

    <a
      className="simple-view__footer"

    >
   Completed by Yessenia Pena
    </a>
  </main>
);


WelcomeView.propTypes = {
  handleStart: PropTypes.func.isRequired
};

export default WelcomeView;
