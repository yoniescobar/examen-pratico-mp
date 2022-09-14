import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const baseUrl='http://localhost:8080/api/fiscalias/'

// Ventana Modales
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #000052',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false); //Creamos nuestro hooks
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [fiscaliaSeleccionada, setfiscaliaSeleccionada]=useState({
    nombre: '',
    municipio:'',
    direccion: '',
    telefono: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setfiscaliaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(fiscaliaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{ //si la petición Get es exitosa que concatene la data que nosda la api
    await axios.post(baseUrl, fiscaliaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{ //concatenamos el id con la fiscalia seleccionada luego creamos una tabla auxiliar para enviar los nuevos registros
    await axios.put(baseUrl+fiscaliaSeleccionada.id, fiscaliaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(oficinafiscalia=>{
        if(fiscaliaSeleccionada.id===oficinafiscalia.id){
          oficinafiscalia.nombre=fiscaliaSeleccionada.nombre;
          oficinafiscalia.municipio=fiscaliaSeleccionada.municipio;
          oficinafiscalia.direccion=fiscaliaSeleccionada.direccion;
          oficinafiscalia.telefono=fiscaliaSeleccionada.telefono;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+fiscaliaSeleccionada.id)
    .then(response=>{
      setData(data.filter(oficinafiscalia=>oficinafiscalia.id!==fiscaliaSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarFiscalia=(oficinafiscalia, caso)=>{ //funcion para que se utliza para actualizar o eliminar ... seleciona la fila para abrir modal segun sea el caso
    setfiscaliaSeleccionada(oficinafiscalia);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Fiscalia</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="municipio" className={styles.inputMaterial} label="Municipio" onChange={handleChange}/>
      <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange}/>
      <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="red" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar oficinafiscalia</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={fiscaliaSeleccionada && fiscaliaSeleccionada.nombre}/>
      <br />
      <TextField name="municipio" className={styles.inputMaterial} label="Municipio" onChange={handleChange} value={fiscaliaSeleccionada && fiscaliaSeleccionada.municipio}/>
      <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange} value={fiscaliaSeleccionada && fiscaliaSeleccionada.direccion}/>
      <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Teléfono" onChange={handleChange} value={fiscaliaSeleccionada && fiscaliaSeleccionada.telefono}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Oficina <b>{fiscaliaSeleccionada && fiscaliaSeleccionada.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
     <TableContainer >
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell>Municipio</TableCell>
             <TableCell>Dirección</TableCell>
             <TableCell>Telefono</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(oficinafiscalia=>(
             <TableRow key={oficinafiscalia.id}>
               <TableCell>{oficinafiscalia.nombre}</TableCell>
               <TableCell>{oficinafiscalia.municipio}</TableCell>
               <TableCell>{oficinafiscalia.direccion}</TableCell>
               <TableCell>{oficinafiscalia.telefono}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarFiscalia(oficinafiscalia, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarFiscalia(oficinafiscalia, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     {/* hooks para controlar open y close*/}
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default App;
