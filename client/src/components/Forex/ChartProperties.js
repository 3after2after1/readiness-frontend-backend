export const ChartProperties = {
  options: {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    // colors: ["#7BE495"],
    dataLabels: {
      enabled: false,
    },
    annotations: {
      xaxis: [
        {
          label: {
            show: false,
          },
        },
      ],
    },

    xaxis: {
      type: "datetime",
      show: false,
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: false,
      decimalsInFloat: 4,
    },
    grid: {
      show: false,
    },
    tooltip: {
      y: {
        show: true,
        title: "",
      },
      x: {
        show: true,
        format: "dd MMM yyyy HH:mm",
        formatter: undefined,
        title: undefined,
      },
      title: {
        name: undefined,
      },
      theme: "dark",
    },
  },
};
