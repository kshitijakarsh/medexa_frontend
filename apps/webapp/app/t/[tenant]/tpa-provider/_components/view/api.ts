// Mock provider details API
export async function getProviderById(id: string) {
  const mock = [
    {
      id: "TPA1",
      chartOfAccount: "Health Finance Bahrain",
      shortName: "HFB",
      contactPhone: "+973 1720 4589",
      contactEmail: "contact@hfb.com",
      mobile: "+973 3312 7456",
      email: "support@hfb.com",
      gstin: "BH-GST-4456778",
      type: "Insurance",
      providerName: "CarePoint TPA",
      contactPerson: "Mr. Ahmed Saleh",
      contactMobile: "+973 3321 8745",
      phone: "+973 1711 6644",
      faxNumber: "+973 1711 6645",
      tnavat: "VAT-BH-778899",
      creditLimit: "15,000 BHD",
      address: "Office 302, Seef Tower, Seef District, Manama, Bahrain",
    },
  ];

  return mock.find((p) => p.id === id) ?? mock[0];
}
