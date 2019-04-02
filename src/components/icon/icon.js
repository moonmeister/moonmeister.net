import React from 'react';
import PropTypes from 'prop-types';

import styles from './icon.module.scss';

const Icon = ({ icon }) => (
  <svg className={styles.icon} viewBox={icon.viewBox}>
    <path d={icon.path} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Icon;
