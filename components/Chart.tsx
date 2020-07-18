import { Line } from "react-chartjs-2";

const options = {
    legend: {
        display: true, // label 숨기기
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    max: 10,
                    stepSize: 2, // 스케일에 대한 사용자 고정 정의 값
                },
            },
        ],
    },
    tooltips: {
        mode: "index",
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
};

interface IPropse {
    dates: Array<string>;
    countByDate: Array<number>;
    thisMonth: string;
}

const Chart = ({ dates = [], countByDate = [], thisMonth = "" }: IPropse) => {
    const data = {
        labels: dates,
        datasets: [
            {
                label: thisMonth,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "rgba(75,192,192,1)",
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(252, 95, 100,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: countByDate,
            },

            // {
            //     label: "방문자",
            //     fill: false,
            //     lineTension: 0.1,
            //     backgroundColor: "rgba(166,94,179,1)",
            //     borderColor: "rgba(166,94,179,1)",
            //     borderCapStyle: "butt",
            //     borderDash: [],
            //     borderDashOffset: 0.0,
            //     borderJoinStyle: "miter",
            //     pointBorderColor: "rgba(166,94,179,1)",
            //     pointBackgroundColor: "rgba(166,94,179,1)",
            //     pointBorderWidth: 5,
            //     pointHoverRadius: 5,
            //     pointHoverBackgroundColor: "rgba(166,94,179,1)",
            //     pointHoverBorderColor: "rgba(252, 95, 100,1)",
            //     pointHoverBorderWidth: 2,
            //     pointRadius: 1,
            //     pointHitRadius: 10,
            //     data: [700, 800, 900, 1000, 1100, 1200, 1125],
            // },
        ],
    };

    return <Line height={500} data={data} options={options} />;
};

export default Chart;
