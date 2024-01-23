// ResizeAndScrollHelper
// helper function to import useEffect for handling
// resizing and scrolling for the lines between windows

// NOTE!!!!!!!
// make sure to declare const targetBlockRef = useRef(null) at the top level of the module
// and attach the ref to the correct element in the module you import it to!

import { useEffect } from 'react';

const useResizeAndScrollEffectOnlyLines = (targetBlockRef, setBlockPosition) => {
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleResize = () => {
      if (targetBlockRef.current) {
        const rects = targetBlockRef.current.getClientRects();
        const firstRect = rects.length > 0 ? rects[0] : null;
        setBlockPosition(firstRect);
      }
    };
    
    const handleScroll = () => {
      if (!targetBlockRef.current) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY !== prevScrollY) {
        const rects = targetBlockRef.current.getClientRects();
        const originalRect = rects.length > 0 ? rects[0] : null;
        if (!originalRect) return;
    
        const scrolledAmount = window.scrollY;
        const updatedRect = {
          ...originalRect,
          top: originalRect.top + scrolledAmount,
          right: originalRect.right,
          bottom: originalRect.bottom + scrolledAmount,
          left: originalRect.left,
          width: originalRect.width,
          height: originalRect.height,
        };
    
        setBlockPosition(updatedRect);
      }
    };
    

    // const handleResize = () => {
    //   if (targetBlockRef.current) {
    //     setBlockPosition(targetBlockRef.current.getBoundingClientRect());
    //   }
    // };

    // const handleScroll = () => {
    //   if (!targetBlockRef.current) return
    //   const currentScrollY = window.scrollY;
    //   if (currentScrollY !== prevScrollY) {
    //     const originalRect = targetBlockRef.current.getBoundingClientRect();
    //     const scrolledAmount = window.scrollY;
    //     const updatedRect = {
    //       ...originalRect,
    //       top: originalRect.top + scrolledAmount,
    //       right: originalRect.right,
    //       bottom: originalRect.bottom + scrolledAmount,
    //       left: originalRect.left,
    //       width: originalRect.width,
    //       height: originalRect.height,
    //     };

    //     setBlockPosition(updatedRect);
    //   }
    // };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetBlockRef]);
};

export default useResizeAndScrollEffectOnlyLines;


// // ResizeAndScrollHelper
// // helper function to import useEffect for handling
// // resizing and scrolling for the lines between windows

// // NOTE!!!!!!!
// // make sure to declare const targetBlockRef = useRef(null) at the top level of the module
// // and attach the ref to the correct element in the module you import it to!

// import { useEffect } from 'react';

// const useResizeAndScrollEffect = (targetBlockRef, setBlockPosition) => {
//   useEffect(() => {
//     let prevScrollY = window.scrollY;

//     const getFirstClientRect = () => {
//       const clientRects = targetBlockRef.current.getClientRects();
//       return clientRects[0];
//     };

//     const handleResize = () => {
//       const firstClientRect = getFirstClientRect()
//       if (firstClientRect) {
//         setBlockPosition(firstClientRect);
//         console.log(firstClientRect)
//       }
//     };

//     const handleScroll = () => {
//       if (!targetBlockRef.current) return
//       const currentScrollY = window.scrollY;
//       if (currentScrollY !== prevScrollY) {
//         const firstClientRect = getFirstClientRect()
//         const originalRect = firstClientRect;
//         const scrolledAmount = window.scrollY;
//         const updatedRect = {
//           ...originalRect,
//           top: originalRect.top + scrolledAmount,
//           right: originalRect.right,
//           bottom: originalRect.bottom + scrolledAmount,
//           left: originalRect.left,
//           width: originalRect.width,
//           height: originalRect.height,
//         };

//         setBlockPosition(updatedRect);
//       }
//     };

//     handleResize();
//     handleScroll();

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [targetBlockRef]);
// };

// export default useResizeAndScrollEffect;
