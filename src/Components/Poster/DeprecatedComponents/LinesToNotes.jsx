import React from 'react';

const NoteLine = ({ noteFromRect, noteToRect, posterRect, transactionStringRect, withdrawalStringRect, color }) => {
  if (!noteFromRect || !noteToRect || !posterRect) {
    return;
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

  //find the center of the rects
  const averageDist = (length1, length2) => {
    return length1+((length2-length1)/2)
  }

  const middleFromX = averageDist(relFromRect.left, relFromRect.right)
  const middleFromY = averageDist(relFromRect.top, relFromRect.bottom)
  const middleToX = averageDist(relToRect.left, relToRect.right)
  const middleToY = averageDist(relToRect.top, relToRect.bottom)

  // // Create the polygon data to fill the space between lines
  // const headerPolygonData = `
  //   ${relFromRect.left} ${relFromRect.top}
  //   ${relToRect.left} ${relToRect.top}
  //   ${relToRect.right} ${relToRect.top}
  //   ${relFromRect.right} ${relFromRect.top}
  // `;

  // const transactionsPolygonData = `
  //   ${relTransactionRect.left} ${relTransactionRect.top}
  //   ${relToRect.left} ${relToRect.top}
  //   ${relToRect.right} ${relToRect.top}
  //   ${relTransactionRect.right} ${relTransactionRect.top}
  // `

  // const withdrawalsPolygonData = `
  //   ${relWithdrawalRect.left} ${relWithdrawalRect.top}
  //   ${relToRect.left} ${relToRect.top}
  //   ${relToRect.right} ${relToRect.top}
  //   ${relWithdrawalRect.right} ${relWithdrawalRect.top}
  // `


  return (
    <g className='hidden'>
      <line
        id='left-side-to-middle'
        x1={relFromRect.left}
        y1={middleFromY}
        x2={middleToX}
        y2={middleToY}
        stroke='white'
        strokeWidth={5}
        opacity={'50%'}
      />
      {/* <line
        id='middle-to-middle'
        x1={middleFromX}
        y1={middleFromY}
        x2={middleToX}
        y2={middleToY}
        stroke='white'
        strokeWidth={5}
        opacity={'50%'}
      /> */}
      {/* <line
          id='top-left-line'
          x1={relFromRect.left}
          y1={relFromRect.top}
          x2={relToRect.left}
          y2={relToRect.top}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        />
        <line
          id='top-right-line'
          x1={relFromRect.right}
          y1={relFromRect.top}
          x2={relToRect.right}
          y2={relToRect.top}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        />
        <line
          id='bottom-left-line'
          x1={relFromRect.left}
          y1={relFromRect.bottom}
          x2={relToRect.left}
          y2={relToRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        />
        <line
          id='bottom-right-line'
          x1={relFromRect.right}
          y1={relFromRect.bottom}
          x2={relToRect.right}
          y2={relToRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        /> */}
      {/* <polygon
        id='header-polygon'
        points={headerPolygonData}
        fill={color}
        opacity={'10%'}
      /> */}
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