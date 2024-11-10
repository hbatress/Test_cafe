import { Selector } from 'testcafe';

const testCases = [
    { email: 'JOELARRIOLA@GMAIL.COM', password: 'JOELARRIOLA40' }, // Solo mayúsculas
    { email: 'joelarriola@gmail.com', password: 'joelarriola40' }, // Solo minúsculas
    { email: 'JOELARRIOLA@GMAIL.COM', password: 'JOELARRIOLA401' }, // Mayúsculas con número
    { email: 'joelarriola@gmail.com', password: 'joelarriola401' }, // Minúsculas con número
    { email: 'JOELARRIOLA@GMAIL.COM', password: 'Joelarriola401' }, // Mayúsculas, minúsculas y número
    { email: 'joelarriola@gmail.com', password: 'Joelarriola401' }, // Minúsculas, mayúsculas y número
    { email: 'JOELARRIOLA@GMAIL.COM', password: 'Joel40' }, // Menor de 8 caracteres
    { email: 'joelarriola@gmail.com', password: 'Joelarriola40123' }, // Mayor de 8 caracteres
    { email: 'joelarriola@gmail.com', password: 'Joelarriola40$' } // Combinación correcta
];

fixture `Pruebas de Login`
    .page `http://localhost:3000/auth/login/login`;

testCases.forEach(({ email, password }) => {
    test(`Prueba de inicio de sesión con ${email} y ${password}`, async t => {
        await t
            .typeText('#username', email)
            .typeText('#password', password)
            .click(Selector('button').withText('Iniciar Sesión'))
            .wait(2000) // Espera 2 segundos
    });
});