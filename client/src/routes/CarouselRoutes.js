import RequestHandler from './RequestHandler';

const getAllCategories = () => {
    return RequestHandler.getRequest('/getAllCategories', null);
};

const getUrlOfCategories = (params) => {
    return RequestHandler.getRequest('/getUrls', params);
};

export const CarouselRoutes = { getAllCategories, getUrlOfCategories};