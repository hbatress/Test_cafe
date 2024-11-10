import { Selector, t } from 'testcafe';

// Define el URL de la página con el formulario
const url = 'http://localhost:3000/auth/login/login';

// Lista de nombres que puedes usar para generar correos (sin tildes)
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
    'Aguilar', 'Bautista', 'Castillo', 'Delgado', 'Espinosa', 'Fuentes', 'Gonzalez', 'Hernandez', 'Ibarra', 'Jimenez',
    'Karam', 'Lopez', 'Martinez', 'Nunez', 'Ortega', 'Perez', 'Quintero', 'Rojas', 'Soto', 'Torres',
    'Vega', 'Zamora', 'Cervantes', 'Diaz', 'Cruz', 'Mendoza', 'Rios', 'Sanchez', 'Valdes', 'Alvarado'
];
fixture`iniciar seccion y cerrar seccion`
    .page(url);

// Mapeo de IDs por grupo
const grupos = [
    ['i10', 'i13', 'i16', 'i18'],
    ['i25', 'i28', 'i31', 'i34', 'i37'],
    ['i44', 'i47', 'i50', 'i53'],
    ['i60', 'i63', 'i66', 'i69'],
    ['i76', 'i79', 'i82', 'i85'],
    ['i92', 'i95', 'i98', 'i101', 'i104'],
    ['i111', 'i114', 'i117', 'i120', 'i123']
];

// Función para seleccionar ID de acuerdo al grupo y el índice de iteración
function seleccionarIdPorGrupo(grupo, i) {
    const totalPersonasPorGrupo = Math.floor(100 / grupos.length); // Total de personas que se asignan a cada grupo
    const grupoIndex = Math.floor(i / totalPersonasPorGrupo);
    return grupo[grupoIndex < grupos.length ? grupoIndex : grupos.length - 1];
}

// Test para llenar el formulario
test('Llenar formulario', async t => {
    for (let i = 0; i < 100; i++) { // Cambiado a 100 iteraciones
        const nombreBase = nombres[i % nombres.length];
        const apellidoBase = apellidos[i % apellidos.length];
        const numero = Math.floor(Math.random() * 10000);

        // Generar correos con diferentes formatos
        const formatosDeCorreo = [
            `${apellidoBase}${nombreBase}@gmail.com`, // Apellido + Nombre
            `${nombreBase}${numero}${apellidoBase}@gmail.com`, // Nombre + Número + Apellido
            `${nombreBase}${apellidoBase}${numero}@gmail.com` // Nombre + Apellido + Número
        ];

        // Elegir un formato al azar
        const correo = formatosDeCorreo[Math.floor(Math.random() * formatosDeCorreo.length)];

        await t
            .typeText(Selector('input[type="email"]'), correo) // Campo de correo
            .wait(2000); // Espera para asegurarte de que el campo de correo esté listo

        // Para cada grupo, selecciona el ID correspondiente
        for (let j = 0; j < grupos.length; j++) {
            const id = seleccionarIdPorGrupo(grupos[j], i);
            await t
                .click(Selector(`label[for="${id}"]`))
                .wait(500); // Espera para asegurar que el clic fue registrado
        }

        await t
            .click(Selector('div[role="button"][aria-label="Submit"]')) // Selecciona el botón de envío usando `aria-label`
            .wait(2000) // Espera 2 segundos después de enviar el formulario
            .navigateTo(url); // Navega de nuevo al formulario para el siguiente envío
    }
});
