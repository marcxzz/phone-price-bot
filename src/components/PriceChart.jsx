"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  price: {
    label: "Prezzo",
    color: "#0073ff",
  },
};

export default function PriceChart({ data }) {
  // console.log(data);

  // const data = [
  //   ...series,
  //   {
  //     date: new Date(1788299300000).toLocaleString("it-IT", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     price: 150,
  //   },
  //   {
  //     date: new Date(1788299415000).toLocaleString("it-IT", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     price: 289,
  //   },
  // ]

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full"
      style={{ height: "400px" }}
    >
      <LineChart
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
        // tickFormatter={(value) => value.slice(0, 3)}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
          domain={["dataMin-50", "dataMax+50"]}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <Line
          dataKey="price"
          name="Prezzo"
          type="stepAfter"
          stroke="var(--color-price)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}