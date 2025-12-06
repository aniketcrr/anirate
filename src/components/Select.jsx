import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block pb-2 text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <select
        {...props}
        ref={ref}
        id={id}
        className={`
          w-full h-11 px-3 py-2 rounded-lg
          bg-white/10 border border-white/10 text-white
          placeholder-slate-400
          focus:border-primary focus:ring-2 focus:ring-primary/40
          outline-none transition duration-200
          ${className}
        `}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select