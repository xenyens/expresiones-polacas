import NodoPila from "./NodoPila";

export default class Pila {
    
    private cima:any;
    
    constructor(){
        this.cima = null;
    }

    pilaVacia(){
        return this.cima === null;
    }

    insertar(data:any){
        let nuevo = new NodoPila(data);
        nuevo.enlace = this.cima;
        this.cima = nuevo;
    }

    verCima(){
        const temp = this.cima;
        return temp.data;
    }

    quitar(){
        if(this.pilaVacia()){
            throw new Error('La pila está vacía y no puedes extraer nada... fin...')
        }
        const aux = this.cima.data;
        this.cima = this.cima.enlace;
        return aux;
    }

    size(){
        let aux = this.cima;
        let elementos = 0;
        while(aux!== null){
            elementos++;
            aux = aux.enlace;
        }
        return elementos;
    }
}