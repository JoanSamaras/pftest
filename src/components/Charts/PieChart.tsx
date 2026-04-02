import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import { Box, Button } from "@mui/material";
import { Character } from "src/store/slices";
import { exportToExcel } from "src/utils";

/** Type Definitions **/
/**********************/

type Props = {
  data: Character[];
}

type ChartPoint = {
  name: string;
  y: number;
  films: string[];
};


/**********************/

export const CharactersPieChart = ({ data }: Props): JSX.Element => {
  const chartData: ChartPoint[] = useMemo(() =>
    data.map((char) => ({
      name: char.name,
      y: char.films.length,
      films: char.films,
    })),
    [data]);

  const options: Highcharts.Options = {
    chart: {
      type: "pie"
    },
    title: {
      text: "Character Film Distribution Per Table Page",
    },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        const point = this as Highcharts.Point & { films: string[] };

        return `
          <b>${point.name}</b><br/>
          Films count: ${point.y}<br/>
          Percentage: ${point.percentage?.toFixed(2)}%<br/>
          <br/>
          <b>Film List:</b><br/>
          ${point.films?.length ? point.films.join("<br/>") : "No films"}
        `;
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Films",
        data: chartData,
      },
    ],
  };

  return (
    <Box pt={8}>
      <HighchartsReact highcharts={Highcharts} options={options} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 4 }}>
        <Button variant="contained" onClick={() => exportToExcel(chartData)}>
          Export to Excel
        </Button>
      </Box>
    </Box>
  );
};
