import React from 'react';

/**
 * Form field used in auth(login/register)
 *
 */

const FormField = props => {
  const { labelText, onChange, fieldType, value } = props;
  return (
    <div>
      <label htmlFor={fieldType}>
        <small>{labelText}</small>
      </label>
      <input
        name={fieldType}
        onChange={onChange}
        type={fieldType === 'password' ? 'password' : 'text'}
        value={value}
      />
    </div>
  );
};

export default FormField;
