import React from 'react';
import PropTypes from 'prop-types';

import RatingStars from './RatingStars';

const liquor_storeViewHeader = ({ name, rating, photoUrl }) => (
  <div
    className="liquor_store__header"
    style={{ backgroundImage: `url(${photoUrl})` }}
  >
    <div
      className="liquor_store__header__summary"
    >
      <h1
        className="liquor_store__header__summary__title"
      >
        {name}
      </h1>

      { rating &&
        <div
          className="liquor_store__header__summary__rating"
        >
          <div
            className="liquor_store__header__summary__rating__value"
          >
            {rating.toFixed(1)}
          </div>
          <RatingStars
            className="liquor_store__header__summary__rating__stars"
            value={rating}
          />
        </div>
      }
    </div>
  </div>
);

liquor_storeViewHeader.defaultProps = {
  photoUrl: 'https://placekitten.com/300/200'
};

liquor_storeViewHeader.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  photoUrl: PropTypes.string
}

export default liquor_storeViewHeader;
