
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { getLabels, loadToys } from '../store/actions/toy.actions';

export function DoughnutChart() {
    const [toys, setToys] = useState(null)
    const labels = getLabels()

    useEffect(() => {
        loadToys()
            .then(setToys)
            .catch(err => console.log('err:', err))
    }, [])

    function countToysInEachLabel(toys) {
        // Initialize an object to store the counts for each label
        const labelCounts = {};

        // Initialize the counts to 0 for each label using map
        labels.map(label => {
            labelCounts[label] = 0;
        });

        // Use reduce to count the labels
        toys.reduce((acc, toy) => {
            if (toy.labels && toy.labels.length > 0) {
                toy.labels.forEach(label => {
                    if (labelCounts[label] !== undefined) {
                        labelCounts[label]++;
                    }
                });
            }
            return acc;
        }, {});

        return labelCounts;
    }

    // Call the function and get the label counts

    if (!toys) return <div>Loading...</div>
    const labelCountsMap = countToysInEachLabel(toys);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Toys of label',
                data: labels.map(label => labelCountsMap[label]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 122, 64, 0.2)',
                    'rgba(255, 200, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 122, 64, 1)',
                    'rgba(255, 200, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };



    return (
        <div>
            <Doughnut data={data} />
        </div>
    )
}
