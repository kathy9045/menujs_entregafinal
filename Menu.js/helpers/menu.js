var colors = require('colors');
const inquirer = require('inquirer');
const { validate } = require('uuid');


const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoja la opción que desee.',
    choices: [
        {
            value: '1',
            name:`${'1.'.bgMagenta} Agregar tarea`,
        },
        {
            value: '2',
            name:`${'2.'.bgMagenta} Listar tareas`,
        },
        {
            value: '3',
            name:`${'3.'.bgMagenta} Listar tareas completas`,
        },
        {
            value: '4',
            name:`${'4.'.bgMagenta} Listar tareas pendientes`,
        },
        {
            value: '5',
            name:`${'5.'.bgMagenta} Completar tarea(s)`,
        },
        {
            value: '6',
            name:`${'6.'.bgMagenta} Eliminar tarea`,
        },
        {
            value:'7',
            name:`${'7.'.bgMagenta} Salir`,
        }
    ]
};

const menu = async () => {
    console.clear();
    console.log(`${'||||||||||||||||||||||||||||||||||||||||||||||'.blue}`);
    console.log(`${'              Bienvenido al Menú              '.bgWhite}`);
    console.log(`${'||||||||||||||||||||||||||||||||||||||||||||||'.blue}`);

    const {options} = await inquirer.default.prompt(questions);
    return options;
};

const pause = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.default.prompt(questions);
};


const leerInput = async (message) => {
    const questions = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0){
                    return 'Por favor seleccione una opción'
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.default.prompt(questions);
    return desc;
}





module.exports = {
    menu,
    pause,
    leerInput
};