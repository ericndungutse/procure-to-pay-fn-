import React from 'react';

/**
 * ResponsiveLaout component renders a div with a specified maximum width and additional styles.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.maxWidth - The maximum width of the div.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the div.
 * @param {string} [props.otherStyles] - Additional CSS classes to apply to the div.
 * @returns {JSX.Element} The rendered div element.
 */
export default function ResponsiveLaout({ maxWidth, children, otherStyles }) {
  return (
    <div
      className={`w-[90%]  ${otherStyles}`}
      style={{
        maxWidth: maxWidth,
      }}
    >
      {children}
    </div>
  );
}
