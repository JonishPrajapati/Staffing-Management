export interface MvInvoice {
    invoiceId: number;
    totalpaid:number;
    employeeId: number;
    firstName:string;
    customerId:number;
    organizationName: string;
}
export interface MvInvoiceDetail{
    assignmentId: number;
    assignmentName: string;
    jobId: number;
    designation:string;
    employeeId:number;
    firstName:string;
    rate: number;
    unit:number;
    totalpaid:number
}
