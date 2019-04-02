import React from 'react';
// import PropTypes from 'prop-types';

import styles from './formContact.module.scss';

const FormContact = () => (
  <div className={styles.container}>
    <form
      name="contact"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
      className={styles.contact}
    >
      <p hidden>
        <label htmlFor="bot-field">
          <span>
            Don&#8217;t fill this out <br />
            if you&#8217;re human:
          </span>
          <input name="bot-field" />
        </label>
      </p>
      <p>
        <label htmlFor="name">
          <span>Your Name:</span>

          <input type="text" name="name" required />
        </label>
      </p>
      <p>
        <label htmlFor="email">
          <span>Your Email:</span>
          <input type="email" name="email" required />
        </label>
      </p>
      <p>
        <label htmlFor="message">
          <span>Message:</span> <textarea name="message" required />
        </label>
      </p>
      <p id={styles.submit}>
        <button type="submit">Send</button>
      </p>
    </form>
  </div>
);

FormContact.propTypes = {};

export default FormContact;
