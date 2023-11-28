/*eslint-disable*/
const Input = ({
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    onKeyDown,
    className
}) => {
    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`${className} outline-none text-base`}
            />
        </>
    )
}

export default Input