import React, { useId } from 'react'

function Input({
    label,
    type = "text",
    className = "",
    ref,
    ...props
}) {

    const id = useId()
    return (
        <div className='w-full '>

            {label && (
                <label className="pb-2 text-sm font-medium text-slate-300" htmlFor={id}>
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                ref={ref}
                className={`${className}`}
                {...props}

            />
        </div>
    )
}

export default Input
