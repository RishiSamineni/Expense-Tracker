import React, { useState } from 'react'; // Make sure useState is imported
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({value, onChange, placeholder, label, type}) => {
    // Corrected useState destructuring:
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div>
        <label className='text-[15px] text-slate-800'>{label}</label>

        <div className="input-box"> 
            <input
                type={type === "password" ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none"
                value={value}
                onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                {showPassword ? (
                    <FaRegEye
                        size={22}
                        className="text-blue-500 cursor-pointer ml-2" // Added margin-left
                        onClick={toggleShowPassword} // Directly use the handler
                    />
                ) : (
                    <FaRegEyeSlash
                        size={22}
                        className="text-slate-400 cursor-pointer ml-2" // Added margin-left
                        onClick={toggleShowPassword} // Directly use the handler
                    />
                )}
                </>
            )}
        </div>
    </div>
  );
};

export default Input;