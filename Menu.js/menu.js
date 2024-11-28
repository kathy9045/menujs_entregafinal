var colors = require('colors');
const inquirer = require('inquirer');

const questions =[
    {
    type: 'list',
    name: 'options',
    message: 'Escoge la opción de tu preferencia',
    choices: [
        {
            value: '1',
            name: `${'1.'.red} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.red} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.red} Listar tareas completas`
        },
        {
            value: '4',
            name: `${'4.'.red} Completar tareas`
        },
        {
            value: '5',
            name: `${'5.'.red} Borrar tarea`
        },
        {
            value: '6',
            name: `${'6.'.red} Salir`
        }
    ]
}
]

const menu = async () => {
    console.clear();
    console.log(`${'||||||||||||||||||||||||||||||||||||||||||||||'}`);
    console.log(`${'|             Bienvenido al Menú'.white            }`);
    console.log(`${'||||||||||||||||||||||||||||||||||||||||||||||'}`);

    const {options} = await inquirer.default.prompt(questions);
    return options;
};

const pausa = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'ENTER'.green} para continuar`
        }
    ];
console.log('\n');
    await inquirer.default.prompt(questions);
};

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor escoja la opción que desea '
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.default.prompt(question);
    return desc;
}

const listarTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar tarea',
            choices
        }
    ];

    const { id } = await inquirer.default.prompt(preguntas);
    return id;
};

const listarTareasCompletar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas completadas',
            choices
        }
    ];

    const { ids } = await inquirer.default.prompt(pregunta);
    return ids;
}

module.exports = {
    menu,
    pausa,
    leerInput,
    listarTareasBorrar,
    listarTareasCompletar
};