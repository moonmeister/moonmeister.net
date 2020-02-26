import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';
import { theme } from '../../tailwind.config';

const ContactForm = styled.form`
  width: 100%;
  text-align: left;

  label {
    margin: auto;
  }

  input,
  textarea {
    width: 75%;
    max-width: 400px;
    display: block;
    resize: none;
    overflow: auto;
    margin: auto;
    line-height: 1.3em;

    border-top: 1px inset hsla(30, 40%, 20%, 0.8);
    border-left: 1px inset hsla(30, 40%, 20%, 0.8);
    border-right: 1px inset;
    border-bottom: 1px inset;

    border-radius: 4px;
  }

  textarea {
    margin-bottom: 3rem;
  }

  span {
    display: block;
    width: 75%;
    max-width: 400px;
    margin: auto;
  }

  button {
    display: block;
    margin: auto;
    background: linear-gradient(hsl(0, 0%, 100%), ${theme.colors.main});
    line-height: 2em;

    width: 50%;
    max-width: 300px;

    border: none;
    box-shadow: 0px 6px hsla(0, 0%, 20%, 0.5);
    border-radius: 4px;
  }

  button:hover {
    box-shadow: 0px 4px ${theme.colors.shadow};
    background: linear-gradient(hsl(0, 0%, 98%), hsl(0, 0%, 89%));
    top: 2px;
    cursor: pointer;
  }

  button:active {
    box-shadow: 0 0 ${theme.colors.shadow};
    background: linear-gradient(hsl(0, 0%, 94%), hsl(0, 0%, 84%));
    top: 6px;
  }
`;

const FormContact = () => (
  <div
    css={css`
      width: 100%;

      ${tw`md:w-4/5`}
    `}
  >
    <ContactForm
      name="contact"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
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
      <p
        css={css`
          margin-bottom: 0;
        `}
      >
        <button type="submit">Send</button>
      </p>
    </ContactForm>
  </div>
);

export default FormContact;
