import { Selector } from 'testcafe';

fixture `Pruebas de Login`
    .page `http://localhost:3000/auth/login/login`;

test('Prueba de inicio de sesión', async t => {
    await t
        .typeText('#username', 'joelarriola@gmail.com')
        .typeText('#password', 'Joelarriola40$')
        .click(Selector('button').withText('Iniciar Sesión'))
        .wait(5000) // Espera 5 segundos para que cargue la otra página
        .click(Selector('button').withAttribute('class', 'p-button p-component p-button-icon-only p-button-secondary p-button-rounded p-button-text mr-2'))
        .wait(2000) // Espera 2 segundos
        .click(Selector('button').withAttribute('class', 'p-button p-component p-button-primary h-10 w-full').withText('cerrar sesión'))
        .wait(2000); // Espera 2 segundos
    });