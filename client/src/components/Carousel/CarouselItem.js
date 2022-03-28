import React from 'react'

export const CarouselItem = ({content, width}) => {
  return (
    <div className="carousel-item" style={{width: width ? width : '100%'}}>
        {content ? <img src={content} alt="new"></img> : null}
    </div>
  )
};

