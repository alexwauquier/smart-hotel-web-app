document.addEventListener('DOMContentLoaded', function() {
    // Temperature Chart
    const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
    const temperatureChart = new Chart(temperatureCtx, {
      type: 'line',
      data: {
        labels: generateTimeLabels(24),
        datasets: [{
          label: 'Temperature (°C)',
          data: generateTemperatureData(24),
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#ff9800',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return `Temperature: ${context.raw}°C`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            min: 18,
            max: 26,
            ticks: {
              stepSize: 2
            }
          }
        }
      }
    });
    
    // Humidity Chart
    const humidityCtx = document.getElementById('humidityChart').getContext('2d');
    const humidityChart = new Chart(humidityCtx, {
      type: 'line',
      data: {
        labels: generateTimeLabels(24),
        datasets: [{
          label: 'Humidity (%)',
          data: generateHumidityData(24),
          borderColor: '#26c6da',
          backgroundColor: 'rgba(38, 198, 218, 0.1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#26c6da',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return `Humidity: ${context.raw}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            min: 55,
            max: 75,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    });
    
    // Handle chart time range changes
    document.getElementById('temperatureTimeRange').addEventListener('change', function(e) {
      const range = e.target.value;
      const hours = getHoursFromRange(range);
      
      temperatureChart.data.labels = generateTimeLabels(hours);
      temperatureChart.data.datasets[0].data = generateTemperatureData(hours);
      temperatureChart.update();
    });
    
    document.getElementById('humidityTimeRange').addEventListener('change', function(e) {
      const range = e.target.value;
      const hours = getHoursFromRange(range);
      
      humidityChart.data.labels = generateTimeLabels(hours);
      humidityChart.data.datasets[0].data = generateHumidityData(hours);
      humidityChart.update();
    });
    
    // Helper functions for chart data generation
    function getHoursFromRange(range) {
      switch(range) {
        case '24h': return 24;
        case '7d': return 24 * 7;
        case '30d': return 24 * 30;
        default: return 24;
      }
    }
    
    function generateTimeLabels(hours) {
      const labels = [];
      const interval = Math.ceil(hours / 24) * 4; // Every 4 hours for 24h, adjusted for longer periods
      
      for (let i = 0; i < hours; i += interval) {
        labels.push(`${i}h`);
      }
      
      // Ensure we have the last time point
      if (labels[labels.length - 1] !== `${hours}h`) {
        labels.push(`${hours}h`);
      }
      
      return labels;
    }
    
    function generateTemperatureData(hours) {
      const baseTemp = 22;
      const data = [];
      
      for (let i = 0; i < hours; i++) {
        // Daily cycle with some randomness
        const timeOfDay = i % 24;
        let temp = baseTemp;
        
        // Cooler at night, warmer during day
        if (timeOfDay < 6) {
          temp -= 2 + (Math.random() * 1);
        } else if (timeOfDay > 6 && timeOfDay < 18) {
          temp += 2 + (Math.random() * 1.5);
        }
        
        // Add small random variations
        temp += (Math.random() - 0.5) * 1;
        
        data.push(parseFloat(temp.toFixed(1)));
      }
      
      return data;
    }
    
    function generateHumidityData(hours) {
      const baseHumidity = 65;
      const data = [];
      
      for (let i = 0; i < hours; i++) {
        // Daily cycle with some randomness
        const timeOfDay = i % 24;
        let humidity = baseHumidity;
        
        // Generally higher at night, lower during the day
        if (timeOfDay < 6) {
          humidity += 5 + (Math.random() * 2);
        } else if (timeOfDay > 10 && timeOfDay < 16) {
          humidity -= 3 + (Math.random() * 2);
        }
        
        // Add small random variations
        humidity += (Math.random() - 0.5) * 3;
        
        data.push(parseInt(humidity.toFixed(0)));
      }
      
      return data;
    }
    
    // Add animations for summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      });
    });
  });