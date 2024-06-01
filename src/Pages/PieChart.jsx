import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

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
      name: "Seekers",
      value: data2.seekers,
    },
    {
      name: "Companies",
      value: data2.companies,
    },
    {
      name: "Employees",
      value: data2.employees,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
