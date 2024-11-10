import { Selector } from 'testcafe';

const nombres = [
    'Agustin', 'Brenda', 'Carmen', 'David', 'Elisa', 'Francisco', 'Gabriela', 'Hector', 'Ivan', 'Jazmin',
    'Karla', 'Leonardo', 'Monica', 'Nicolas', 'Oscar', 'Patricia', 'Raul', 'Silvia', 'Tania', 'Ulises',
    'Valeria', 'Ximena', 'Yandel', 'Zoe', 'Adriana', 'Bruno', 'Claudia', 'Diana', 'Esteban', 'Fernando',
    'Gina', 'Hugo', 'Isabel', 'Jose', 'Katherine', 'Luis', 'Marta', 'Nora', 'Ricardo', 'Sofia',
    'Tomas', 'Ursula', 'Victor', 'Walter', 'Xiomara', 'Yadira', 'Zulema', 'Alba', 'Barbara', 'Cesar',
    'Diana', 'Evelyn', 'Felipe', 'Gilda', 'Humberto', 'Ilda', 'Josue', 'Lia', 'Mariano', 'Nina',
    'Otto', 'Pablo', 'Quintin', 'Raquel', 'Salvador', 'Tania', 'Violeta', 'Wilfredo', 'Yaritza'
];

const apellidos = [
    'Gonzalez', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Garcia', 'Perez', 'Sanchez', 'Ramirez', 'Torres',
    'Flores', 'Rivera', 'Gomez', 'Diaz', 'Cruz', 'Morales', 'Ortiz', 'Gutierrez', 'Chavez', 'Ramos',
    'Vargas', 'Castillo', 'Jimenez', 'Mendoza', 'Silva', 'Romero', 'Soto', 'Reyes', 'Fernandez', 'Ruiz',
    'Herrera', 'Medina', 'Aguilar', 'Castro', 'Vasquez', 'Rojas', 'Guerrero', 'Molina', 'Delgado', 'Pena',
    'Alvarez', 'Rios', 'Ortiz', 'Sandoval', 'Contreras', 'Mejia', 'Padilla', 'Cabrera', 'Miranda', 'Vega'
];

const palabras = [
    'Atitlán', 'Antigua', 'Tikal', 'Pacaya', 'Xela', 'Chichicastenango', 'Semuc Champey', 'Flores', 'Livingston', 'Monterrico',
    'Izabal', 'Huehuetenango', 'Petén', 'Zacapa', 'Retalhuleu', 'Escuintla', 'Jalapa', 'Jutiapa', 'Santa Rosa', 'Sololá',
    'Totonicapán', 'Quetzaltenango', 'Chimaltenango', 'Sacatepéquez', 'Guatemala', 'Mixco', 'Villa Nueva', 'San Miguel Petapa', 'Amatitlán', 'Villa Canales',
    'Mazatenango', 'Chiquimula', 'Cobán', 'Salamá', 'Puerto Barrios', 'San Marcos', 'Quiché', 'Baja Verapaz', 'Alta Verapaz', 'Jutiapa',
    'Santa Lucía Cotzumalguapa', 'San Juan Sacatepéquez', 'San Pedro Sacatepéquez', 'San José Pinula', 'San Pedro Ayampuc', 'San Raymundo', 'San Juan Ermita', 'San Cristóbal Verapaz', 'San Martín Jilotepeque', 'San Lucas Sacatepéquez'
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

fixture `Pruebas de Login`
    .page `http://localhost:3000/auth/login/login`;

test('Prueba de inicio de sesión', async t => {
    const nombre = getRandomElement(nombres);
    const apellido = getRandomElement(apellidos);
    const palabra = getRandomElement(palabras);
    const simbolo = '@';
    const numero = Math.floor(Math.random() * 100); // Genera un número aleatorio

    await t
        .typeText('#username', 'joelarriola@gmail.com')
        .typeText('#password', 'Joelarriola40$')
        .click(Selector('button').withText('Iniciar Sesión'))
        .wait(5000) // Espera 5 segundos para que cargue la otra página
        .click(Selector('button').withAttribute('class', 'p-button p-component p-button-icon-only p-button-secondary p-button-rounded p-button-text mr-2'))
        .wait(2000) // Espera 2 segundos
        .click(Selector('a').withAttribute('href', '/register/registerUser')) // Hace clic en el enlace de registro de usuarios
        .wait(2000) // Espera 2 segundos después de hacer clic en el enlace
        .click(Selector('span').withAttribute('class', 'p-fieldset-legend-label').withText('Crear usuario')) // Hace clic en "Crear usuario"
        .typeText('#nombre', nombre) // Agrega un nombre
        .typeText('#apellido', apellido) // Agrega un apellido
        .typeText('#contrasena', `${palabra}${numero}${simbolo}`) // Agrega una palabra con un número y un símbolo especial
        .typeText('#correo', `${nombre}${Math.floor(Math.random() * 100)}@gmail.com`) // Agrega un correo
        .click(Selector('.p-select-dropdown')) // Hace clic en el desplegable
        .wait(2000) // Espera 2 segundos después de hacer clic en el enlace
        .click(Selector('span.p-select-option-label').withText('Activo')) // Selecciona "Activo"
        .click(Selector('button.p-autocomplete-dropdown')) // Hace clic en el desplegable de roles
        .wait(2000) // Espera 2 segundos después de hacer clic en el enlace
        .click(Selector('#autoCompleteRol_list').child('li').withText('Moderador')) // Selecciona "Moderador"
        .click(Selector('span').withAttribute('class', 'p-button-label').withText('Crear')); // Hace clic en "Crear"
});