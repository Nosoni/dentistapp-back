const express = require("express")
const administracion = express.Router();

let jsreport = require('jsreport-core')();
jsreport.use(require('jsreport-handlebars')());
jsreport.use(require('jsreport-chrome-pdf')());
let fs = require('fs');

console.log('Inicializando jsreport globalmente...');
jsreport.init();

const contenido = `
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">

<style>
    div {
        background-color: #343a40;
        height: 100%;
    }
    h1 {
        text-align:center;
        color: #fff;
    }   
</style>
<div>
    <h1>
    Hello world {{name}}
    </h1>
</div>
`;

async function renderizar(req, res) {
    let nombreArchivo = "prueba" + '-' + Date.now() + '.pdf';

    console.log('Renderizando reporte: ' + nombreArchivo);
    console.log(process.cwd())
    console.log(__dirname)

    try {
        await jsreport.render({
            template: {
                content: contenido,
                engine: 'handlebars',
                recipe: 'chrome-pdf',
                phantom: {
                    orientation: "vertical",
                },
            },
            data: {
                name: "francisco"
            }
        }).then(resp => {
            fs.writeFileSync((__dirname + '/outputs/' + nombreArchivo), resp.content)
            console.log('Archivo creado: ' + nombreArchivo);
        }).catch(err => console.log(err));
    } catch (error) {
        console.log(error)
    }


    const file = fs.createReadStream(__dirname + '/outputs/' + nombreArchivo);
    const stat = fs.statSync(__dirname + '/outputs/' + nombreArchivo);

    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + nombreArchivo);

    await file.pipe(res);

    console.log('PDF generado correctamente: ' + nombreArchivo);
}

administracion.post('/prueba', renderizar);

module.exports = administracion