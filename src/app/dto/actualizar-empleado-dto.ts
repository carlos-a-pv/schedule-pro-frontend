export interface ActulizarEmpleadoDTO {
    id: string;
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    departamento: string;
    cargo: string;
    fechaContratacion: Date;
    precioHora: number; 
}