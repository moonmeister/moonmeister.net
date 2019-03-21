import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
    }}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
