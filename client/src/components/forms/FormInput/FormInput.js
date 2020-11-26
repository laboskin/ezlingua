import React from "react";
import Select from "react-select";
import './style.scss';


function FormInput({error, name, id, label, type, register, placeholder, options, handleSelectChange, ...props}) {
    const classNames = ['FormGroup']
    if (error)
        classNames.push('FormGroup_hasError');

    if (type === 'select') {
        register(id);
        handleSelectChange(options[0]);
    }

    return (
        <div className={classNames.join(' ')}>
            {type === 'select' && (
                <Select
                    id={id}
                    name={name}
                    onChange={handleSelectChange}
                    options={options}
                    defaultValue={options[0]}/>
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