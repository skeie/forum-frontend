import React from 'react';
import Post from '../Post';
import posts from '../../testData/posts';
import renderer from 'react-test-renderer';

const content = ['', 'sapdap dette er fett', ''];

it('Posts renders correctly', () => {
    const tree = renderer.create(<Post content={content} />).toJSON();
    expect(tree).toMatchSnapshot();
});
