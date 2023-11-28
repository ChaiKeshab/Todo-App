/*eslint-disable*/
const Input = ({
    type,
    name,
    checked,
    id,
    value,
    onChange,
    className
}) => {
    return (
        <>
            <input
                name={name}
                checked={checked}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`${className} outline-none text-base`}
            />
        </>
    )
}

export default Input