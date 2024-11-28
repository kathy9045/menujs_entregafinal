const fs = require('fs');
const path = require('path');
const colors = require('colors');
const Tarea = require('./tarea'); // Importar la clase Tarea

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
        this.cargarTareasFromDB();
    }

    cargarTareasFromDB() {
        const filePath = path.join(__dirname, '../data/tareas.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            const tareasData = JSON.parse(data);
            tareasData.forEach(tarea => {
                this._listado[tarea.id] = tarea;
            });
        }
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc); // Crear nueva tarea
        this._listado[tarea.id] = tarea; // Agregar al listado
        this.guardarDB(); // Guardar cambios en la base de datos
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
            this.guardarDB();
        }
    }

    guardarDB() {
        // Guardar en formato JSON
        const datos = JSON.stringify(this.listadoArr, null, 2);
        fs.writeFileSync(path.join(__dirname, '../data/tareas.json'), datos);

        // Guardar en formato TXT
        const formatoTxt = this.listadoArr
            .map((tarea, idx) => `${idx + 1}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada' : 'Pendiente'}`)
            .join('\n');
        fs.writeFileSync(path.join(__dirname, '../data/tareas.txt'), formatoTxt);

        // Guardar en formato CSV
        const encabezados = 'ID,Descripción,Estado\n';
        const filas = this.listadoArr
            .map(tarea => `${tarea.id},"${tarea.desc}",${tarea.completadoEn ? 'Completada' : 'Pendiente'}`)
            .join('\n');
        fs.writeFileSync(path.join(__dirname, '../data/tareas.csv'), encabezados + filas);
    }

    toggleTareas(completadas = false) {
        const tareasParaCompletar = this.listadoArr
            .filter(tarea => completadas ? !tarea.completadoEn : tarea.completadoEn)
            .map(tarea => tarea.id);

        return tareasParaCompletar;
    }

    completarTareas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (tarea) {
                tarea.completadoEn = tarea.completadoEn ? null : new Date().toISOString();
            }
        });
        this.guardarDB();
    }

    listadoCompleto() {
        console.log('\nTareas:'.blue);
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarTareasCompletadas(completadas = true) {
        let contador = 0;
        const tareasResultado = [];

        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn, id } = tarea;

            if ((completadas && completadoEn) || (!completadas && !completadoEn)) {
                contador++;
                const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
                console.log(`${contador}. ${desc} :: ${estado}`);
                
                tareasResultado.push({
                    id,
                    desc,
                    completadoEn,
                    indice: contador
                });

                if (completadoEn) {
                    console.log(`   Completada en: ${completadoEn}`.gray);
                }
            }
        });

        if (contador === 0) {
            console.log(completadas ? 'No hay tareas completadas'.yellow : 'No hay tareas pendientes'.yellow);
        }

        return tareasResultado;
    }
}

module.exports = Tareas;
