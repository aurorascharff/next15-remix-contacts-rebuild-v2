import React from 'react';

type Props = {
  errors?: string[];
  name: string;
};

export default function TextArea({ errors, ...otherProps }: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <textarea
        className={errors ? 'outline outline-2 outline-destroy' : ''}
        aria-describedby="error"
        {...otherProps}
      />
      {errors && <span className="font- text-destroy">{errors[0]}</span>}
    </div>
  );
}
