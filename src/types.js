// @flow

export type Posts = Array<{
    content: Content,
    user: {
        username: string,
        userImage: string,
    },
    quoteText: ?string,
    date: string,
}>;

export type Content = Array<string>;
