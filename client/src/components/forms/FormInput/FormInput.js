import React from "react";
import Select from "react-select";
import './style.scss';


function FormInput({error, name, id, label, type, register, placeholder, options, ...props}) {
    const classNames = ['FormGroup']
    if (error)
        classNames.push('FormGroup_hasError');

    return (
        <div className={classNames.join(' ')}>
            {type === 'select' && (
                <Select options={options} />
            )}
            {type !== 'select' && (
                <input className="FormGroup-Input" {...props}
                       name={name}
                       id={id}
                       type={type}
                       ref={register}
                       placeholder={placeholder} />
            )}
            {label && (
                <label className="FormGroup-Label"
                       htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="FormGroup-Error">
                {error}
            </div>
        </div>
    )
}
export default FormInput;