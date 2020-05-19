import React from 'react';
import PropTypes from 'prop-types';

import liquor_storeViewHeader from './liquor_storeViewHeader';
import liquor_storetViewDetails from './liquor_storeViewDetails';



const liquor_storeView = ({
  name,
}) => (
  <main
    className="main liquor_store"
  >
    <liquor_storeViewHeader
      name={name}
    />
  </main>
);

liquor_storeViewHeader.defaultProps = {
};

liquor_storeView.propTypes = {
  name: PropTypes.string.isRequired
};

export default liquor_storeView;
