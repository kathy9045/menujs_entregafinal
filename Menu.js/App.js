const { menu, pausa, leerInput, listarTareasBorrar, listarTareasCompletar }  = require('./menu');
const Tareas = require('./models/tareas');
const inquirer = require('inquirer');
const colors = require('colors');

const principal = async () => {
    let opt = '';
    const tareas = new Tareas();

    // Bucle para mostrar el menú
    do {
        opt = await menu();
        
        // Ejecutará la opción seleccionada 
        switch (opt) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción de la tarea:');
                tareas.crearTarea(desc);
                console.log('Tarea creada exitosamente'.green);
                break;

            case '2': // Listar tareas
                tareas.listadoCompleto();
                break;

            case '3': // Listar tareas completadas
                console.log('\nTareas Completadas:'.green);
                tareas.listarTareasCompletadas(true);
                break;

                case '4': // Completar tareas
                const idsCompletar = await listarTareasCompletar(tareas.listadoArr);
                if (idsCompletar.length > 0) {
                    tareas.completarTareas(idsCompletar);  // Usa este método en lugar de toggleTareas
                    console.log('Tareas actualizadas exitosamente'.green);
                }
                break;

            case '5': // Borrar tarea
                const id = await listarTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const confirmacion = await inquirer.default.prompt([  
                        {
                            type: 'confirm',
                            name: 'ok',
                            message: '¿Está seguro que desea borrar la tarea?'
                        }
                    ]);

                    if (confirmacion.ok) {
                        tareas.borrarTarea(id);

                        console.log('Tarea borrada exitosamente'.green);
                    }
                }
                break;
        }

        if (opt !== '6') {
            await pausa();
        }
    } while (opt !== '6');
}

principal();