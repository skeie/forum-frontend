import React from 'react';
import Arrow from '../arrowUI';
import posts from '../../testData/posts';
import renderer from 'react-test-renderer';

const fetch = jest.fn();

it('Arrow renders correctly left way', () => {
    const tree = renderer.create(<Arrow way="left" fetch={fetch} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Arrow renders correctly right way', () => {
    const tree = renderer.create(<Arrow way="right" fetch={fetch} />).toJSON();
    expect(tree).toMatchSnapshot();
});
