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
          left: -15,
          right: 10,
          top: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          interval="preserveStart"
          tick={({ x, y, payload }) => {
            const date = new Date(payload.value);

            const day = date.toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "2-digit",
              timeZone: "Europe/Rome",
            });

            const time = date.toLocaleTimeString("it-IT", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Rome",
            });

            return (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fill="currentColor"
                fontSize={12}
              >
                <tspan x={x} dy="16">
                  {day}
                </tspan>
                <tspan x={x} dy="16">
                  {time}
                </tspan>
              </text>
            );
          }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
          domain={["dataMin-50", "dataMax+50"]}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const timestamp = payload?.[0]?.payload?.date;

                if (!timestamp) return "";

                return new Date(timestamp).toLocaleString("it-IT", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Europe/Rome",
                });
              }}
            />
          }
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