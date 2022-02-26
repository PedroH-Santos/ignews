import { render, screen, fireEvent } from '@testing-library/react';
import { SubscribeButton } from '.';
import { useSession, signIn } from 'next-auth/react';
import { mocked } from 'ts-jest/utils';
import { useRouter } from 'next/router';

jest.mock('next-auth/react'); 

jest.mock('next/router');

describe('SubscribeButton component', () => {


    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false] as any);
        render(
            <SubscribeButton />
        )
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn);

        render(<SubscribeButton />)
        const subscriptionButton = screen.getByText('Subscribe now');
        fireEvent.click(subscriptionButton);
        expect(signInMocked).toHaveBeenCalled();
    });

    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter);
        const useSessionMocked = mocked(useSession);
        const pushMocked = jest.fn();
        useSessionMocked.mockReturnValueOnce([
            { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires', activeSubscription: 'fake-active-subscription'},
            false
        ] as any);

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked
        } as any)
        render(<SubscribeButton />)
        const subscriptionButton = screen.getByText('Subscribe now');
        fireEvent.click(subscriptionButton);
        expect(pushMocked).toHaveBeenCalledWith('/posts');
    })



})





