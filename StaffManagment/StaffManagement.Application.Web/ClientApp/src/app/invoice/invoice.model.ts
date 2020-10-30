export interface MvInvoice {
    invoiceId: number;
    totalrate:number;
    employeeId: number;
    firstName:string;
    lastName: string;
    fullName:string
    customerId:number;
    organizationName: string;
    totalPaid:number
}
export interface MvInvoiceDetail{
    invoiceId: number;
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
