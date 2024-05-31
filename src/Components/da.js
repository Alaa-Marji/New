const mockData = {
  data: [
    {
      id: 1,
      role: "admin",
      permissions: [
        "create users",
        "edit user",
        "view user",
        "modify role",
        "modify permission",
        "view user",
        "modify role",
        "view user",
        "modify role",
        "view user",
        "modify role",
      ],
      datePosted: "2020-10-09T17:54:48",
    },
    {
      id: 2,
      role: "user",
      permissions: ["view user"],
      datePosted: "2020-10-09T17:55:34",
    },
    {
      id: 3,
      role: "Manager",
      permissions: ["view user"],
      datePosted: "2020-10-09T17:55:34",
    },
  ],
};

export default mockData;
