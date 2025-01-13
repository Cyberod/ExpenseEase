document.addEventListener('DOMContentLoaded', function() {
    fetch('/Income/income_source_summary')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Income Data:', data.income_source_data);
            
            // Income Charts
            createPieChart('incomePieChart',
                Object.keys(data.income_source_data),
                Object.values(data.income_source_data),
                'Income Distribution'
            );
            createBarChart('incomeBarChart',
                Object.keys(data.income_source_data),
                Object.values(data.income_source_data),
                'Income by Source'
            );
        })
        .catch(error => console.error('Error:', error));
            


    // Reusable chart functions
    function createPieChart(canvasId, labels, data, title) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    }
                }
            }
        });
    }

    function createBarChart(canvasId, labels, data, title) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: '#36A2EB',
                    borderColor: '#2693e6',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
