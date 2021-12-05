const express = require('express');
const definiciones = require('../constantes');
const { reporteFacturas } = require('../controller/facturas');
const router = express.Router()

const contenido = `
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">

<style>
    div {
        height: 100%;
    }
    h1 {
        text-align:center;
        color: black;
        font-style: oblique;
    }   
</style>
<div>
  <h1>Facturas clientes</h1>

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
      <tr>
        {{#each datos}}
          {{#with this}}
            <td>{{documento}}</td>
            <td>{{paciente}}</td>
            <td>{{comprobante}}</td>
            <td>{{fecha}}</td>
            <td>{{total}}</td>
          {{/with}}    
        {{/each}}
      </tr>
    </tbody>
  </table> 
</div>
`;

async function filtrar(req, res) {

  let fs = require('fs');
  const jsreport = req.app.get(definiciones.jsreport)
  let nombreArchivo = "prueba" + '-' + Date.now() + '.pdf';

  const facturas = await reporteFacturas(req.body)
  const tabla = facturas.map(factura => {
    return {
      documento: factura.paciente.documento,
      paciente: `${factura.paciente.nombres}, ${factura.paciente.apellidos}`,
      comprobante: factura.comprobante,
      fecha: factura.fecha,
      total: factura.total
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