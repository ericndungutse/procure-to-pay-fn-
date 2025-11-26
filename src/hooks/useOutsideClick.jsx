import { useEffect, useRef } from 'react';

export default function useOutsideClick(handler, stopPropagation = false) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClickOutside, stopPropagation);

    return () => {
      document.removeEventListener('click', handleClickOutside, stopPropagation);
    };
  }, [handler, stopPropagation]);

  return ref;
}
