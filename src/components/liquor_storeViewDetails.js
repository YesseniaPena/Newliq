import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import liquor_storeViewHeader from './liquor_storeViewHeader';

const liquor_storetViewDetails = ({
  address, phone, websiteUrl, googlePageUrl, distanceInTime, distanceInSpace
}) => (
  <div
    className="liquor_store__details"
  >
    <div
      className="liquor_store__details--top"
    >
      <div
        className="liquor_store__details__item"
      >
        <Icon
          className="liquor_store__details__item__icon"
          name="location_on"
        />
        <div
          className="liquor_store__details__item__text"
        >
          {address}
        </div>
      </div>

      { phone &&
        <div
          className="liquor_store__details__item"
        >
          <Icon
            className="liquor_store__details__item__icon"
            name="phone"
          />
          <a
            className="liquor_store__details__item__text"
            href={`tel:${phone.replace(/ /g,'')}`}
          >
            {phone}
          </a>
        </div>
      }

      { websiteUrl &&
        <div
          className="liquor_store__details__item"
        >
          <Icon
            className="liquor_store__details__item__icon"
            name="link"
          />
          <a
            className="liquor_store__details__item__text"
            href={websiteUrl}
          >
            {websiteUrl}
          </a>
        </div>
      }
    </div>

    { distanceInTime && distanceInSpace &&
      <a
        className="liquor_store__details--bottom"
        href={googlePageUrl}
      >
        <div
          className="liquor_store__details__item"
        >
          <Icon
            className="liquor_store__details__item__icon"
            name="directions_walk"
          />
          <div
            className="liquor_store__details__item__text"
          >
            {distanceInTime} ({distanceInSpace})
          </div>
        </div>
      </a>
    }
  </div>
);

liquor_storeViewHeader.propTypes = {
  address: PropTypes.string.isRequired,
  phone: PropTypes.string,
  websiteUrl: PropTypes.string,
  googlePageUrl: PropTypes.string.isRequired,
  distanceInTime: PropTypes.string,
  distanceInSpace: PropTypes.string
}

export default liquor_storeViewHeader;
