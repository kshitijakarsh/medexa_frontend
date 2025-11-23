export function getMockData(mode: "bed" | "bedType" | "ward" | "floor") {
  const base = {
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
  };

  switch (mode) {
    case "bed":
      return [
        { id: 1, bedNo: "101", bedType: "ICU", ward: "General Ward", floor: "Ground Floor", status: "Active", ...base },
        { id: 2, bedNo: "G-11", bedType: "VIP", ward: "VIP", floor: "1st Floor", status: "Inactive", ...base },
      ];
    case "bedType":
      return [
        { id: 1, name: "Standard", ...base },
        { id: 2, name: "Normal", ...base },
        { id: 3, name: "VIP", ...base },
      ];
    case "ward":
      return [
        { id: 1, name: "VIP Ward", ...base },
        { id: 2, name: "Private Ward", ...base },
        { id: 3, name: "General Ward", ...base },
      ];
    case "floor":
      return [
        { id: 1, name: "Ground Floor", ...base },
        { id: 2, name: "1st Floor", ...base },
        { id: 3, name: "2nd Floor", ...base },
      ];
  }
}
