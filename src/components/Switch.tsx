import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 flex items-center rounded-full transition-all duration-300 ${
        checked ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Switch;
