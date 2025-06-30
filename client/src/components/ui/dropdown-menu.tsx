import * as React from "react";

const DropdownMenuContext = React.createContext(null);

export function DropdownMenu({ children }) {
  return (
    <div className="relative inline-block text-left" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      {children}
    </div>
  );
}

export function DropdownMenuTrigger({ children, asChild }) {
  if (asChild) {
    return React.cloneElement(children, { tabIndex: 0 });
  }
  return (
    <button type="button" tabIndex={0} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, align = "start", className = "" }) {
  const alignmentClasses = {
    start: "origin-top-left left-0",
    end: "origin-top-right right-0",
  };
  return (
    <div
      className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${alignmentClasses[align]} ${className}`}
      role="menu"
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
