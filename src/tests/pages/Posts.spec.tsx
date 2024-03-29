import {render,screen} from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { stripe } from '../../services/stripe';
import {getPrismicClient} from '../../services/prismic'
import { mocked } from 'ts-jest/utils';
jest.mock('../../services/prismic');

const posts = [
    {slug: 'my-new-post',title: 'My New Post', excerpt: 'Post excerpt', updatedAt: '10 de abril'}
]
describe('Posts page', () => {
    it('renders correctly', () => {
        render(<Posts posts={posts} />);
        expect(screen.getByText("My New Post")).toBeInTheDocument();
    });

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient);
        getPrismicClientMocked.mockResolvedValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                {type: 'heading', text: 'My New Post'}
                            ],
                            content: [
                                {type: 'paragraph', text: 'Post excerpt'}
                            ],
                        },
                        last_publication_date: '04-01-2021',
                    }
                ]
            })
        } as never) ;

        const response = await getStaticProps({});

        expect(response).toEqual(expect.objectContaining({
            props: {
                posts: [{
                    slug: 'my-new-post',
                    title: 'My New post',
                    expect: 'Post excerpt',
                    last_publication_date: '01 de abril de 2021'
                }]
            }
        }))

        
    })
}) 