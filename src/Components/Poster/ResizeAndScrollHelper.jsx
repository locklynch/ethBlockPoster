// ResizeAndScrollHelper
// helper function to import useEffect for handling
// resizing and scrolling for the lines between windows

// NOTE!!!!!!!
// make sure to declare const targetBlockRef = useRef(null)
// and attach the ref to the correct element in the module you import it to!

import { useEffect } from 'react';

const useResizeAndScrollEffect = (targetBlockRef, setBlockPosition) => {
  useEffect(() => {
    let prevScrollY = window.scrollY;
    const targetBlock = targetBlockRef.current;

    const handleResize = () => {
      if (targetBlockRef.current) {
        setBlockPosition(targetBlock.getBoundingClientRect());
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== prevScrollY) {
        const originalRect = targetBlockRef.current.getBoundingClientRect();
        const scrolledAmount = window.scrollY;
        const updatedRect = {
          top: originalRect.top + scrolledAmount,
          right: originalRect.right,
          bottom: originalRect.bottom,
          left: originalRect.left,
          width: originalRect.width,
          height: originalRect.height,
        };

        setBlockPosition(updatedRect);
      }
    };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetBlockRef, setBlockPosition]);
};

export default useResizeAndScrollEffect;
