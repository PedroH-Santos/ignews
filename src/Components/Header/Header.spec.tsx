import { render,screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => { //Fixa o retorno de um valor que é externo no componente
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})


jest.mock('next-auth/react', () => { //Fixa o retorno de um valor que é externo no componente
    return {
        useSession() {
            return [null, false]
        }
    }
}) 

describe('Header component', () => {


    it('renders correctly', () => {
        render(
            <Header /> 
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Posts')).toBeInTheDocument()


    })


})





