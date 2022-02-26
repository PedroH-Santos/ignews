import { render, screen } from '@testing-library/react';
import { SignInButton } from '.';
import { useSession } from 'next-auth/react';
import { mocked } from 'ts-jest/utils';

jest.mock('next-auth/react')

describe('SignInButton component', () => {


    it('renders correctly when users is not authentication', () => {

        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false] as any);
        render(
            <SignInButton />
        )
        expect(screen.getByText('Sign in with github')).toBeInTheDocument()
    })

    it('renders correctly when users is authentication', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([
            { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' },
             false
        ] as any);
        render( 
            <SignInButton />
        )
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
 
})





