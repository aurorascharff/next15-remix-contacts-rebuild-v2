import React from 'react';

type Props = {
  errors?: string[];
  name: string;
};

export default function TextArea({
  errors,
  name,
  ...otherProps
}: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <textarea
        id={name}
        name={name}
        className={errors ? 'outline outline-2 outline-destroy' : ''}
        aria-describedby="error"
        {...otherProps}
      />
      {errors && <span className="font- text-destroy">{errors[0]}</span>}
    </div>
  );
}
