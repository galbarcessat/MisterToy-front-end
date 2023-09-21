
import { DoughnutChart } from '../cmps/DoughnutChart'

export function ToyDashboard() {


    return (
        <div className='dougnut-chart-container'>
            <h2>Dashboard</h2>
            {/* <Doughnut data={data} />; */}
            <DoughnutChart />
        </div>
    )
}

