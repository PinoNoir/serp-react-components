export type FormData = {
    // Step 1
    phoneNumber: string;
    companyName: string;
    jobTitle: string;
    // Step 2
    firstName: string;
    lastName: string;
    workEmail: string;
    consent: boolean;
    // Step 3
    dmeSoftware: string[];
    painPoints: string;
    csrCount: number;
    billerCount: number;
    dispatcherCount: number;
    warehouseCount: number;
    equipmentLossValue: number;
    // Step 4
    additionalComments: string;
    // Step 5
    rentEquipment: string;
    billFacilities: string;
    billInsurance: string;
    techsDrivers: string;
    patientCensus: string;
  }
  