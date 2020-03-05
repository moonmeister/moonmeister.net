import * as React from 'react';
import tw from 'tailwind.macro';
// import './formContact.css';

const FormContact = () => (
  <div css={tw`md:w-4/5 w-full`}>
    <form
      data-netlify="true"
      method="POST"
      name="contact"
      netlify-honeypot="bot-field"
    >
      <input name="form-name" type="hidden" value="contact" />
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

          <input id="name" name="name" required type="text" />
        </label>
      </p>
      <p>
        <label htmlFor="email">
          <span>Email:</span>
          <input id="email" name="email" required type="email" />
        </label>
      </p>
      <p>
        <label htmlFor="message">
          <span>Message:</span>{' '}
          <textarea id="message" name="message" required />
        </label>
      </p>
      <p css={tw`mb-0`}>
        <button type="submit">Send</button>
      </p>
    </form>
  </div>
);

export default FormContact;
