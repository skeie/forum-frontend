import React from 'react';
import { Username, ProfileImage, Date } from '../Profile';
import backendData from '../../testData/posts';
import renderer from 'react-test-renderer';
import { post } from '../../fetch/fetch';

it('Username renders correctly', () => {
    const tree = renderer.create(<Username username="dahBest" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('ProfileImage renders correctly', () => {
    const tree = renderer
        .create(<ProfileImage userImage={backendData.posts[0].userImage} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Date renders correctly', () => {
    const tree = renderer.create(<Date date="19/04" />).toJSON();
    expect(tree).toMatchSnapshot();
});
