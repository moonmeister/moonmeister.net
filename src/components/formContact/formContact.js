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
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label htmlFor="bot-field">
          <span>
            Don&#8217;t fill this out <br />
            if you&#8217;re human:
          </span>
          <input id="bot-field" name="bot-field" />
        </label>
      </p>
      <p>
        <label htmlFor="name">
          <span>Name:</span>

          <input id="name" type="text" name="name" required />
        </label>
      </p>
      <p>
        <label htmlFor="email">
          <span>Email:</span>
          <input id="email" type="email" name="email" required />
        </label>
      </p>
      <p>
        <label htmlFor="message">
          <span>Message:</span>{' '}
          <textarea id="message" name="message" required />
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
