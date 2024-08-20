import React from 'react';

type Props = {
  error?: string;
  name: string;
};

export default function Input({ error, name, ...otherProps }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full">
      <input
        name={name}
        id={name}
        className={error ? 'outline outline-2 outline-destroy' : ''}
        aria-describedby="error"
        {...otherProps}
      />
      {error && <span className="text-destroy">{error}</span>}
    </div>
  );
}
