// mock API for details
import { getMockCompanies } from "../api";

export async function getCompanyById(id: string) {
  const all = getMockCompanies();
  return all.find((c) => c.id === id) ?? null;
}
