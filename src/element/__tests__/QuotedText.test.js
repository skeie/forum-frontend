import React from 'react';
import QuotedText from '../QuotedText';
import renderer from 'react-test-renderer';

it('Username renders correctly', () => {
    const tree = renderer
        .create(<QuotedText text="www.jegerbest.com" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
