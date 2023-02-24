import React from 'react';
import './../../assets/css/Body.css';
import Form from './Form/Form';

/**
 * -- Body component
 * : Wraps the body elements
 * @params None
 * @returns <Body> (JSX element)
 */
export default function Body() {
  return (
    <div className='body-base'>
        <Form/>
    </div>
  );
}

