import React, { useState } from 'react'
import { Button } from 'react-bootstrap'; 
import './Carousel.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; 

const Carousel = ({children}) => {

    //hook to manage image index
    const [index, setIndex] = useState(0);

    //function to manage changing image
    const updateIndex = (index) => {
        
        //1) validate index input and adjust if necessary (shouldn't reach here based on disabled logic but adding just in case)
        if (index < 0) {
            //handle negative case
            index = 0;
        } else if (index >= React.Children.count(children)) {
            //in the case where it went to more than max, readjust
            index = React.Children.count(children) - 1;
        }

        //2) update hook
        setIndex(index);
    };

    //children items + the arrows to navigate the carousel
    return (
        <div className="carousel">
            <div className="carousel-container" style={{transform: `translateX(-${index * 100}%)`}}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {width: "100%"})
                })}
            </div>
             
            <Button 
                disabled={!(index > 0)} className="carousel-button" 
                onClick={()=>{updateIndex(index - 1)}}>
                <BsChevronLeft></BsChevronLeft>
            </Button>

            <Button 
                disabled={!(index < React.Children.count(children)-1)} className="carousel-button" 
                onClick={()=>{updateIndex(index + 1)}}>
                <BsChevronRight></BsChevronRight>
            </Button>
            
        </div>
    )
};

export default Carousel;