import React from 'react';
import PropTypes from 'prop-types';

import styles from './icon.module.scss';

const Icon = ({ icon }) => (
  <svg className={styles.icon} viewBox={icon.viewBox}>
    {icon.path.map((path, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return <path d={path} key={`path-${i}`} />;
    })}
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Icon;
