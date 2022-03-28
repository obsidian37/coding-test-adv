import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Carousel,  CarouselItem }from './components/Carousel';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { CarouselRoutes } from './routes';

function App() {

  //hooks to manage 1) loading state, list of categories that usuer can choose, and the urls for the carousel
  const [isPageLoading , setIsPageLoading] = useState(false);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [selectedUrls, setSelectedUrls] = useState(null);

  //initial load of categories
  useEffect(() => {
    getAllCategories();
  }, []);

  //async call functions
  const getAllCategories = async () => {
    const allCategoriesResponse = await CarouselRoutes.getAllCategories();
    setListOfCategories(allCategoriesResponse['categories']);
  };
  const getUrls = async (selectedCategories) => {
    //load the page loading screen
    setIsPageLoading(true);

    //attemps to call API endpoint
    const urlResponse = await CarouselRoutes.getUrlOfCategories({categories: selectedCategories.toString()});

    //update with new URLs + reset page loading
    setSelectedUrls(urlResponse['urls']);
    setIsPageLoading(false);
  };

  //Note: did not import default react bootstrap css overrides as it does not work with the homebrew carousel solution, so keeping it as standard checkbox format
  //1) Dynamically generates the checkboxes based on query to the express layer (using react bootstrap without the imported css)
  //2) Dynamically generates the Carousel items within the Container, generated based on query to express layer (using img src)
  return (
    <div className="App">
      <ToggleButtonGroup className="carousel-selection" type="checkbox" onChange={getUrls}>
        {listOfCategories ? listOfCategories.map((category, index) => {
            return (
              <ToggleButton className="carousel-selection-button" value={category}>
                {category}
              </ToggleButton>
            );
          }) : null}
      </ToggleButtonGroup>
      <Carousel>
          {!isPageLoading && selectedUrls && selectedUrls.length > 0 ? selectedUrls.map((url) => {
            return (
              <CarouselItem content={url}/>
            );
          }) : <img src={logo} className="App-logo" alt="logo" />}
      </Carousel>
    </div>
  );
}

export default App;
