define({ "api": [
  {
    "type": "post",
    "url": "/comisiones/alta/",
    "title": "da de alta una nueva comision",
    "name": "altaComision",
    "group": "Comisiones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "la",
            "description": "<p>Comision a dar de alta.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "ultimo",
            "description": "<p>id insertado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Comisiones"
  },
  {
    "type": "post",
    "url": "/comisiones/eliminar/",
    "title": "elimina la comision",
    "name": "eliminarComision",
    "group": "Comisiones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "la",
            "description": "<p>Comision a eliminar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Comisiones"
  },
  {
    "type": "post",
    "url": "/comisiones/modificar/",
    "title": "modifica la comision",
    "name": "modificarComision",
    "group": "Comisiones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "la",
            "description": "<p>Comision a modificar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Comisiones"
  },
  {
    "type": "get",
    "url": "/comisiones/",
    "title": "Trae todas las comisiones",
    "name": "traerTodasLasComiciones",
    "group": "Comisiones",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>de comiciones.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Comisiones"
  },
  {
    "type": "post",
    "url": "/alumnoCurso/alta/",
    "title": "asigna un alumno al curso",
    "name": "altaAlumno",
    "group": "Curso",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "el",
            "description": "<p>alumno a dar de alta.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se realizo.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Curso"
  },
  {
    "type": "get",
    "url": "/cursos",
    "title": "trae todos los cursos",
    "name": "TraerCursos",
    "group": "Cursos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "devuelve",
            "description": "<p>los alumnos por curso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Cursos"
  },
  {
    "type": "post",
    "url": "/cursos/eliminar",
    "title": "elimina un curso especifico",
    "name": "eliminarCurso",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "objeto",
            "optional": false,
            "field": "objeto",
            "description": "<p>del curso a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false segun se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Cursos"
  },
  {
    "type": "get",
    "url": "/cursos/modificar",
    "title": "modificar un curso especifico",
    "name": "modificacionDeCurso",
    "group": "Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "objeto",
            "optional": false,
            "field": "el",
            "description": "<p>objeto del curso a modificar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false segun si se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Cursos"
  },
  {
    "type": "get",
    "url": "/cursos",
    "title": "",
    "name": "traerTodosLosCursos",
    "group": "Cursos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "devuelve",
            "description": "<p>los cursos.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Cursos"
  },
  {
    "type": "post",
    "url": "/encuestas/alta",
    "title": "",
    "name": "altaEncuestas",
    "group": "Encuesta",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>con los datos de la encuesta.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "devuelve",
            "description": "<p>el ultimo id insertado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Encuesta"
  },
  {
    "type": "get",
    "url": "/usuarios/{id_usuario}/encuestas/{id_encuesta}/preguntas",
    "title": "Devuelve las preguntas con las respuestas de una encuesta (id_encuesta)",
    "name": "TraerPreguntasEncuestasID",
    "group": "Encuestas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>con las preguntas de la una encuesta.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Encuestas"
  },
  {
    "type": "post",
    "url": "/encuestas/enviar",
    "title": "asigna una encuesta a un curso",
    "name": "enviarEncuesta",
    "group": "Encuestas_Cursos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "objeto",
            "optional": false,
            "field": "Encuesta",
            "description": "<p>a asignar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Encuestas_Cursos"
  },
  {
    "type": "post",
    "url": "/encuestas/borrar",
    "title": "elimina la encuesta segun id",
    "name": "eliminarEncuesta",
    "group": "Encuestas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "objeto",
            "description": "<p>de la encuesta a eliminar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se elimino o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Encuestas"
  },
  {
    "type": "get",
    "url": "/usuarios/{id_usuario}/encuestas/",
    "title": "Devuelve las encuestas del id_usuario, Si se pasa el parametro \"?estado=\" (pendiente o completada), devuelve las encuestas en esos estados sino trae todas.",
    "name": "encuestasUsuarios",
    "group": "Encuestas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>de las encuentas del usuario.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Encuestas"
  },
  {
    "type": "get",
    "url": "/usuarios/{id_usuario}/encuestas/{id_encuestas}",
    "title": "Devuelve las encuestas id_encuestas del id_usuario",
    "name": "encuestasUsuarios2",
    "group": "Encuestas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>de las encuentas id_encuestas del usuario.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Encuestas"
  },
  {
    "type": "get",
    "url": "/encuestas/{id_encuesta}",
    "title": "Devuelve la encuesta pasada por parametro id_encuesta",
    "name": "traerEncuesta",
    "group": "Encuestas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "objeto",
            "optional": false,
            "field": "objeto",
            "description": "<p>de encuesta especifica.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Encuestas"
  },
  {
    "type": "get",
    "url": "/encuestas/{id_encuesta}/preguntas",
    "title": "Devuelve las preguntas de la encuesta pasada por parametro id_encuesta",
    "name": "traerPreguntasDeEncuestas",
    "group": "Encuestas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>con las preguntas de las encuestas.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Encuestas"
  },
  {
    "type": "post",
    "url": "/cursos/alta",
    "title": "da de alta al curso",
    "name": "altaDeCurso",
    "group": "Graficos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "el",
            "description": "<p>array con los datos del curso</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "ultimo",
            "description": "<p>id insertado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Graficos"
  },
  {
    "type": "get",
    "url": "/GrafAlumnosPorCurso",
    "title": "trae los alumnos por curso",
    "name": "alumnosPorCurso",
    "group": "Graficos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "devuelve",
            "description": "<p>los alumnos por curso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Graficos"
  },
  {
    "type": "get",
    "url": "/GrafEncuestasPorCurso",
    "title": "trae las encuenstas por curso",
    "name": "encuestasPorCurso",
    "group": "Graficos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "devuelve",
            "description": "<p>las encuestas por curso asignado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Graficos"
  },
  {
    "type": "get",
    "url": "/GrafRespuestasDePreguntas",
    "title": "trae las respuestas por pregunta de las encuestas",
    "name": "respuestasDePreguntasParaGrafico",
    "group": "Graficos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "devuelve",
            "description": "<p>las respuestas por preguntas de las encuestas.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Graficos"
  },
  {
    "type": "post",
    "url": "/pregunta/alta",
    "title": "alta de preguntas",
    "name": "altaPreguntas",
    "group": "Pregunta",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>con los datos de la pregunta.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "devuelve",
            "description": "<p>el ultimo id insertado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Pregunta"
  },
  {
    "type": "post",
    "url": "/usuarios/{id_usuario}/encuestas/respuestas",
    "title": "Inserta una respuesta segun el id_usuario, id_pregunta y opcion.",
    "name": "insertarRespuesta",
    "group": "Respueesta",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "ultimo",
            "description": "<p>id insertado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Respueesta"
  },
  {
    "type": "get",
    "url": "/encuestas/{id_encuesta}/alumnos",
    "title": "Devuelve los alumnos que tienen asignada una encuestas segun el id_encuesta.",
    "name": "alumnosPorEncuesta",
    "group": "Respuesta",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "devuelve",
            "description": "<p>array de alumnos segun encuensta.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Respuesta"
  },
  {
    "type": "delete",
    "url": "/pregunta/{id_pregunta}",
    "title": "Elimina una pregunta segun su id_pregunta",
    "name": "eliminarPregunta",
    "group": "Respuesta",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si funciono o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/ws_alejo.php",
    "groupTitle": "Respuesta"
  },
  {
    "type": "post",
    "url": "/usuarios/modificar",
    "title": "Modifica un usuario, segun su ID",
    "name": "UsuarioModificar",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "el",
            "description": "<p>usuario a modificar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Usuarios"
  },
  {
    "type": "post",
    "url": "/usuarios/alta/{usuario}",
    "title": "Da de alta un usuario nuevo",
    "name": "crearUsuario",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "el",
            "description": "<p>usuario a crear.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "ultimo",
            "description": "<p>id insertado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Usuarios"
  },
  {
    "type": "delete",
    "url": "/usuarios/borrar/{objeto}",
    "title": "elimina un usuario segun id",
    "name": "eliminarUsuario",
    "group": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false segun si se elimino o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Usuarios"
  },
  {
    "type": "post",
    "url": "/usuarios/eliminar/",
    "title": "Elimina un usuario segun su id",
    "name": "eliminarUsuario",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "el",
            "description": "<p>usuario a borrar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "devuelve",
            "description": "<p>true o false si se realizo o no.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Usuarios"
  },
  {
    "type": "get",
    "url": "/usuarios/",
    "title": "Trae la lista de usuarios",
    "name": "getUsuarios",
    "group": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "lista",
            "description": "<p>de usuarios en el ws.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Usuarios"
  },
  {
    "type": "get",
    "url": "/usuarios/traer/{objeto}",
    "title": "devuelve un usuario por su id",
    "name": "traerUsuarioEspecifico",
    "group": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "devuelve",
            "description": "<p>el usuario buscado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "ws1/index.php",
    "groupTitle": "Usuarios"
  }
] });
