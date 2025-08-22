type FormFieldNames = 'name' | 'email' | 'message';

interface FormInputProps {
  label: string;
  name: FormFieldNames;
  value: string;
  type?: 'text' | 'email' | 'textarea';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: (field: FormFieldNames) => void;
  onBlur: (field: FormFieldNames) => void;
  isFocused: boolean;
  rows?: number;
}

const FormInput = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  onFocus,
  onBlur,
  isFocused,
  rows,
}: FormInputProps) => {
  const isTextArea = type === 'textarea';
  const InputElement = isTextArea ? 'textarea' : 'input';

  const commonProps = {
    id: name,
    name: name,
    value: value,
    onChange,
    onFocus: () => onFocus(name),
    onBlur: () => onBlur(name),
    required: true,
    className: `w-full p-3 pt-5 rounded bg-dark-base/30 border-b border-highlight focus:outline-none focus:border-secondary transition-colors ${
      isTextArea ? 'resize-none' : ''
    }`,
    placeholder: '',
  };

  return (
    <div className='relative'>
      <InputElement {...commonProps} rows={isTextArea ? rows : undefined} />
      <label
        htmlFor={name}
        className={`absolute left-3 font-body text-text/70 dark:text-dark-text/70 transition-all pointer-events-none ${
          isFocused || value ? 'text-sm -top-2' : 'top-3.5'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;