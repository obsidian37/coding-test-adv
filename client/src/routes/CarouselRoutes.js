import RequestHandler from './RequestHandler';

const getAllCategories = () => {
    return RequestHandler.getRequest('/category/getAllCategories', null);
};

const getUrlOfCategories = (params) => {
    return RequestHandler.getRequest('/photo/getUrls', params);
};

export const CarouselRoutes = { getAllCategories, getUrlOfCategories};