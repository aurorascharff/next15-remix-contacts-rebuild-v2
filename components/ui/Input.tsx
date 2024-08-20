import React from 'react';

type Props = {
  errors?: string[];
  name: string;
};

export default function Input({ errors, name, ...otherProps }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full">
      <input
        id={name}
        name={name}
        className={errors ? 'outline outline-2 outline-destroy' : ''}
        aria-describedby="error"
        {...otherProps}
      />
      {errors && <span className="text-destroy">{errors[0]}</span>}
    </div>
  );
}
