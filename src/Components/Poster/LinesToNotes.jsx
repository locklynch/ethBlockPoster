import React from 'react';

const NoteLine = ({ noteFromRect, noteToRect, posterRect, transactionStringRect, withdrawalStringRect, color }) => {
  if (!noteFromRect || !noteToRect || !posterRect) {
    return null;
  }

  const convertRectToRelative = (rect) => ({
    top: rect.top - posterRect.top,
    right: rect.right - posterRect.left,
    bottom: rect.bottom - posterRect.top,
    left: rect.left - posterRect.left,
  });

  const relFromRect = convertRectToRelative(noteFromRect);
  const relToRect = convertRectToRelative(noteToRect);
  const relTransactionRect = convertRectToRelative(transactionStringRect);
  const relWithdrawalRect = convertRectToRelative(withdrawalStringRect);

  // console.log('relFrom', relFromRect)


  // const relFromRect = {
  //   top: (noteFromRect.top-posterRect.top),
  //   right: (noteFromRect.right-posterRect.left),
  //   bottom: (noteFromRect.bottom-posterRect.top),
  //   left: (noteFromRect.left-posterRect.left),

  // }

  // const relToRect = {
  //   top: (noteToRect.top-posterRect.top),
  //   right: (noteToRect.right-posterRect.left),
  //   bottom: (noteToRect.bottom-posterRect.top),
  //   left: (noteToRect.left-posterRect.left),
  // }

  // Create the polygon data to fill the space between lines
  const headerPolygonData = `
    ${relFromRect.left} ${relFromRect.top}
    ${relToRect.left} ${relToRect.top}
    ${relToRect.right} ${relToRect.top}
    ${relFromRect.right} ${relFromRect.top}
  `;

  const transactionsPolygonData = `
    ${relTransactionRect.left} ${relTransactionRect.top}
    ${relToRect.left} ${relToRect.top}
    ${relToRect.right} ${relToRect.top}
    ${relTransactionRect.right} ${relTransactionRect.top}
  `

  const withdrawalsPolygonData = `
    ${relWithdrawalRect.left} ${relWithdrawalRect.top}
    ${relToRect.left} ${relToRect.top}
    ${relToRect.right} ${relToRect.top}
    ${relWithdrawalRect.right} ${relWithdrawalRect.top}
  `


  return (
    <g>
      <polygon
        points={headerPolygonData}
        fill={color}
        opacity={'10%'}
      />
      {/* <polygon
        points={transactionsPolygonData}
        fill={color}
        opacity={'20%'}
      />
      <polygon
        points={withdrawalsPolygonData}
        fill={color}
        opacity={'20%'}
      /> */}
    </g>
  )
}

export default NoteLine