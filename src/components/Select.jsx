import React from 'react'

function Select({ options, ...props }, ref) {
    return (
        <>
            <select {...props} ref={ref}>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))

                }
            </select>
        </>
    )
}

export default React.forwardRef(Select)