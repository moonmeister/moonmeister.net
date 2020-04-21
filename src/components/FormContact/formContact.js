import * as React from 'react';
import './formContact.css';

const FormContact = () => (
  <form
    className="w-full"
    data-netlify="true"
    id="contact-form"
    method="POST"
    name="contact"
    netlify-honeypot="bot-field"
  >
    <div className="flex flex-col flex-wrap mb-6 sm:flex-row">
      <input name="form-name" type="hidden" value="contact" />
      <div className="hidden">
        <label className="input-label" htmlFor="bot-field">
          Don&#8217;t fill this out <br />
          if you&#8217;re human:
        </label>
        <input id="bot-field" name="bot-field" />
      </div>
      <div className="input-container">
        <input
          id="contact-name"
          name="name"
          placeholder="John Lennon"
          required
          type="text"
        />
        <label htmlFor="contact-name">Name</label>
      </div>
      <div className="input-container">
        <input
          id="contact-email"
          name="email"
          placeholder="john@beatles.music"
          required
          type="email"
        />
        <label htmlFor="contact-email">Email</label>
      </div>
    </div>
    <div className="input-container mb-6">
      <textarea
        className="w-full"
        id="contact-message"
        name="message"
        placeholder="Help! I need somebody&#10;Help! Not just anybody&#10;Help! You know I need someone&#10;Help!"
        required
      />
      <label htmlFor="contact-message">Message</label>
    </div>
    <div className="flex justify-center px-3 md:mx-0">
      <button className="" type="submit">
        Send
      </button>
    </div>
  </form>
);

export default FormContact;
