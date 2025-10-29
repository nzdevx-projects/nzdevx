'use client';

import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// ──────────────────────────────────────────────── Custom Select Component */
export const CustomSelect = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select option...',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // ─── Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ─── Calculate dropdown height for smooth animation
  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(isOpen ? dropdownRef.current.scrollHeight : 0);
    }
  }, [isOpen, options]);

  // ─── Handle keyboard navigation (Enter, Escape, Arrow keys)
  const handleKeyDown = (event) => {
    if (disabled) return;
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
    }
  };

  // ─── Handle option selection
  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // ─── Get the text to display in the select button
  const getDisplayValue = () => {
    if (value) {
      const selectedOption = options.find((opt) => (typeof opt === 'string' ? opt === value : opt.value === value));
      return selectedOption ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label) : value;
    }
    return placeholder;
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* ─── Select Button */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`custom-select w-full flex items-center justify-between 
            border-primary px-4 py-3 text-left transition-300 
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${isOpen ? 'ring-1 ring-cyan-600 dark:ring-cyan-400' : ''}
          ${!value && !disabled ? 'text-gray-400 dark:text-gray-500' : ''}
        `}
      >
        <span className="truncate">{getDisplayValue()}</span>
        <ChevronDown
          className={`size-4 transition-300
          ${isOpen ? 'rotate-180' : ''}
          ${value || isOpen ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}
        `}
        />
      </div>

      {/* ─── Dropdown Menu */}
      <div
        className={`absolute z-50 w-full mt-2 bg-primary rounded-md shadow-primary border-primary ring-1 ring-cyan-600 dark:ring-cyan-400 overflow-hidden transition-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          height: `${dropdownHeight}px`,
        }}
      >
        <div
          ref={dropdownRef}
          className={` transition-300 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
          style={{
            transitionDelay: isOpen ? '150ms' : '0ms',
          }}
        >
          <div className="p-3 space-y-3 max-h-[296px] overflow-auto">
            {options.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const isSelected = optionValue === value;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOptionClick(optionValue)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 text-sm text-left
                    transition-300 rounded transform hover:scale-[1.02]
                    ${
                      isSelected
                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-primary shadow-sm'
                        : 'text-secondary bg-primary-card hover:shadow-sm'
                    }
                  `}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  <span className="truncate">{optionLabel}</span>
                  {/* ─── Show checkmark for selected option */}
                  <div
                    className={`transition-all duration-200 ${
                      isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                  >
                    <Check className="size-4 text-primary" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
