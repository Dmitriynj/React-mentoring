/* eslint-disable no-underscore-dangle */

const originalModule = jest.requireActual('react-router-dom');
const mockedModule = jest.createMockFromModule('react-router-dom');

const reactRouterDom = {
  ...mockedModule,
  ...originalModule,
};

reactRouterDom.__setSpy = (name, value) => {
  reactRouterDom[name] = value;
};

module.exports = reactRouterDom;
