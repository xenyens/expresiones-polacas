export default class NodoPila{
    
    private siguiente:any;
    private data:any;

    constructor(data:any){
        this.data = data;
        this.siguiente = null;
    }

    get enlace() : any {
        return this.siguiente;
    }
    set enlace(siguiente: any) {
        this.siguiente = siguiente;
    }
}