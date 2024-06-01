import axios from "axios";
import Cookie from "cookie-universal";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function BarChar() {
  const cookie = Cookie();
  const [data2, setData2] = useState({
    posts: 0,
    opportunities: 0,
    applies: 0,
  });

  const getData = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:8000/api/admin/countPOA", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      if (res.status === 200) {
        setData2(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const data = [
    {
      name: "Posts",
      amount: data2.posts,
    },
    {
      name: "Opportunites",
      amount: data2.opportunites,
    },
    {
      name: "Applies",
      amount: data2.applies,
    },
  ];

  return (
    <ResponsiveContainer width="50%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={75}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 39, right: 39 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="amount" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
