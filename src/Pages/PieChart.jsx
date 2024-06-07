// import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart } from "@mui/x-charts/PieChart";

import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";

export default function PieChar() {
  const cookie = Cookie();
  const [data2, setData2] = useState({
    users: 0,
    seekers: 0,
    companies: 0,
    employees: 0,
  });

  const getData = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:8000/api/admin/countUsers", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      if (res.status === 200) {
        setData2(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const data = [
    {
      id: 0,
      label: "Seekers",
      value: data2.seekers,
    },
    {
      id: 1,
      label: "Companies",
      value: data2.companies,
    },
    {
      id: 2,
      label: "Employees",
      value: data2.employees,
    },
  ];
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
}
