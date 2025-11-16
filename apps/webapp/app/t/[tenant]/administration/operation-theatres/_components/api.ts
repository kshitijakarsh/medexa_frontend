// Simulated API for Operation Theatres / Procedure Rooms
export function getMockOperationTheatreData() {
  return [
    {
      id: 1,
      operationRoom: "OT-001",
      roomName: "General Surgery OT 1",
      floor: "Floor Name",
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
    },
    {
      id: 2,
      operationRoom: "OT-002",
      roomName: "OT 2",
      floor: "Floor Name",
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: i + 3,
      operationRoom: `OT-${String(i + 3).padStart(3, "0")}`,
      roomName: "Floor Name",
      floor: "Floor Name",
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
    })),
  ];
}
