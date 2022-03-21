const express = require('express');
const definiciones = require('../constantes');
const { reporteCobranzas } = require('../controller/cobranzas');
const router = express.Router()

const contenido = `
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">

<style>
    div {
        height: 100%;
        margin-left: 5%;
        margin-right: 5%;
    }
    h1 {
        text-align:center;
        color: black;
        font-style: oblique;
    }   
</style>
<div>
  <h1>{{titulo}}</h1>

  <table>
    <thead>
      <tr>
        <th>
            Documento
        </th>
        <th>
            Paciente
        </th>
        <th>
            Comprobante
        </th>
        <th>
            Fecha
        </th>
        <th>
            Total
        </th>
      </tr>
    </thead>
    <tbody>
      {{#each datos}}
        {{#with this}}
          <tr>
            <td>{{documento}}</td>
            <td>{{paciente}}</td>
            <td>{{comprobante}}</td>
            <td>{{fecha}}</td>
            <td>{{total}}</td>
          </tr>
        {{/with}}    
      {{/each}}
    </tbody>
  </table> 
</div>
`;

async function filtrar(req, res) {

  let fs = require('fs');
  const jsreport = req.app.get(definiciones.jsreport)
  let nombreArchivo = "prueba" + '-' + Date.now() + '.pdf';

  const cobranzas = await reporteCobranzas(req.body)
  const tabla = cobranzas.map(cobranza => {
    return {
      documento: cobranza.paciente.documento,
      paciente: `${cobranza.paciente.nombres}, ${cobranza.paciente.apellidos}`,
      comprobante: cobranza.comprobante,
      fecha: cobranza.fecha,
      total: cobranza.total
    }
  })

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
        datos: tabla,
        titulo: 'Listado de cobranzas'
      }
    }).then(resp => {
      fs.writeFileSync((__dirname + '/outputs/' + nombreArchivo), resp.content)
    }).catch(error =>
      console.log(error)
    );
  } catch (error) {
    console.log(error)
  }

  try {

    const file = fs.createReadStream(__dirname + '/outputs/' + nombreArchivo);
    const stat = fs.statSync(__dirname + '/outputs/' + nombreArchivo);

    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + nombreArchivo);

    await file.pipe(res);

  } catch (error) {
    console.log(error)
  }
}

router.post(`/filtrar`, filtrar)

module.exports = router;