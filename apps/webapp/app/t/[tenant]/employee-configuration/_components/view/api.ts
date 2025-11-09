export const mockEmployees = [
  {
    id: "EMP122333",
    name: "Dheeraj Acharya",
    department: "Cardiology",
    designation: "Doctor",
    role: "Doctor",
    phone: "+974 4488 1122",
    email: "info@hamad.qa",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    personal: {
      gender: "Male",
      dob: "1987-04-23",
      maritalStatus: "Married",
      nationality: "Indian",
      cpr: "287042312345",
      cprExpiry: "2027-04-23",
      bloodGroup: "B+",
    },
    contact: {
      phone: "+974 6612 8745",
      email: "dr.mariam.farooq@gmail.com",
      officeEmail: "mariam.farooq@alhayathospital.qa",
      emergencyContact: "+974 5590 3321",
      localAddress: "Building 22, Al Sadd Street, Doha, Qatar",
      permanentAddress: "Villa No. 8, Aluva, Kochi, Kerala, India",
      languages: "English, Arabic, Malayalam",
    },
    employment: {
      qualification: "MBBS, MD (Internal Medicine)",
      experience: "12 Years",
    },
    visa: {
      visaStart: "2023-06-10",
      visaExpiry: "2026-06-09",
      passportNumber: "P7845632",
      passportExpiry: "2028-03-25",
      licenseNumber: "QH-MED-102345",
      licenseExpiry: "2025-11-30",
    },
    contract: {
      joiningDate: "2023-06-10",
      contractType: "Contractual",
      contractStart: "2021-08-01",
      contractExpiry: "2028-03-25",
      contractRenewal: "2024-07-15",
      noticePeriod: "60 Days",
      salary: "22,500 QAR",
      iban: "QA58QNBA000000123456789012345",
      accountNumber: "10024578963",
      bankName: "Qatar National Bank (QNB)",
      accountName: "Dr. Mariam Farooq",
      swiftCode: "QNBAQAQA",
      basicSalary: "18,000 QAR",
      gosi: "0%",
      housingAllowance: "4,000 QAR",
    },
    documents: [
      { label: "QCHP License Copy", url: "/images/license1.jpg" },
      { label: "Passport Copy", url: "/images/passport1.jpg" },
    ],
    systemAccess: {
      username: "Dheerajmariam.farooq",
      password: "********",
    },
  },
];

export async function getEmployeeById(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees.find((emp) => emp.id === id) || null);
    }, 700);
  });
}
