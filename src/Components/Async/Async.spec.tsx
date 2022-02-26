import {render,screen,waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
    render(<Async/>);
    expect(screen.getByText('Hellow world')).toBeInTheDocument();
    expect(await screen.findByText('Button')).toBeInTheDocument();

    await waitFor (() => {
        expect(screen.getByText('Button')).toBeInTheDocument();
    })

    await waitForElementToBeRemoved(screen.queryByText('Button'));

})



//SCREEN
// GET - NÃO AGUARDA O ELEMENT
// QUERY - SE NÃO ACHAR O ELEMENTO N DA ERRO
// FIND - ESPERA O ELEMENTO APARECER POR UM TEMPO