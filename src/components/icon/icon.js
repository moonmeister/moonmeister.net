import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@reach/tooltip';

import '@reach/tooltip/styles.css';
import styles from './icon.module.scss';

const Icon = ({ icon, tooltip }) => (
  <Tooltip
    label={tooltip}
    className={styles.tooltip}
    style={{ position: 'absolute', left: '-10px' }}
  >
    <svg className={styles.icon} viewBox={icon.viewBox}>
      {icon.path.map((path, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <path d={path} key={`path-${i}`} />;
      })}
    </svg>
  </Tooltip>
);

Icon.propTypes = {
  icon: PropTypes.shape({
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    viewBox: PropTypes.string.isRequired,
  }).isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default Icon;
