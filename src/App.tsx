import { useState } from 'react';

import Pila from './utils/Pila'

function App() {
  
  const [expresion, setExpresion] = useState('');
  const [salida, setSalida] = useState('');
  const [error, setError] = useState(false);


  function esLetra(caracter:string):boolean {
    return /[a-zA-Z]/.test(caracter);
  }
  function esOperador(operador:string):boolean{
    return /[//*+(-^]/.test(operador);
  }

  const prioridad = {
    '^':'^',
    '*':'*',
    '/':'/',
    '+':'+',
    '-':'-',
    '(':'('
  }

  interface Operador {
    simbolo:string,
    prioridad:number
  }

  function expresionPostFija(e:any){
    e.preventDefault();
    const pila = new Pila();
    let i = 0;
    let expr = '';
    const array = expresion.split('');
    let operador : Operador;
    do {
      if(esLetra(array[i])){        
        //console.log(esLetra(array[i]));
        expr += array[i];
      } else if(esOperador(array[i])){
        
        if(array[i] === prioridad['^']){
          operador = {simbolo:'^',prioridad:3}
        } else if(array[i] === prioridad['*']){
          operador = {simbolo:'*',prioridad:2}
        } else if(array[i] === prioridad['/']){
          operador = {simbolo:'/',prioridad:2}
        } else if(array[i] === prioridad['+']){
          operador = {simbolo:'+',prioridad:1}
        } else if(array[i] === prioridad['-']){
          operador = {simbolo:'-',prioridad:1}
        } else if(array[i] === prioridad['(']){
          operador = {simbolo:'(',prioridad:0}
        } else{
          operador = {simbolo:'undefined',prioridad:-1}
          setError(true);
          throw new Error('Símbolo no reconocido');
        }
        if(pila.pilaVacia()){          
          pila.insertar(operador);
        } else{
          if( operador.prioridad > pila.verCima().prioridad){
            pila.insertar(operador);
          } else {
            const cima = pila.quitar();
            expr += cima.simbolo;
            pila.insertar(operador)            
          }
          
        }
      }
      i++;
    }while(i < array.length);
    
    while(pila.size() > 0){
      expr += pila.quitar().simbolo;
      console.log(expr);
    }

    console.log('tamaño de pila: ' + pila.size());
    console.log('expresión obtenida:' +  expr);
    console.log(pila);
    setSalida(expr);

  }


  return (
    <>
    <h1 className='p-10 text-red-400 text-center text-3xl font-bold'>Convertidor Expresión Infija a Polaca Inversa</h1>
    <form 
      onSubmit={expresionPostFija}
      className='flex flex-col items-center space-y-5 mx-10'
    >
      
      <div className='flex flex-col items-center w-full'>
        <label id='expresion' className='text-xl block uppercase font-bold'>Ingresa tu expresión</label>
        <input
          type="text"
          placeholder='Expresión infija'
          value={expresion}
          onChange={(e)=>setExpresion(e.target.value)}
          className='p-2 rounded-md mt-2 w-full'
        />
      </div>
      
      <div className='w-full'>
        <input type="submit" value='Convertir' className='p-3 bg-pink-600 rounded-md w-full'/>
      </div>
      {
        error ? <p>Hay un símbolo incorrecto en la expresión</p> : <p>{salida}</p>
      }
    </form>
    </>
  )
}

export default App
