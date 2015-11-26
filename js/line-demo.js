(function () {
  var data = {
    title: "GDP at Market Prices (Kshs trillions)",
    xLabel: 'Year', 
    yLabel: 'GDP (trillions)',
    labelFont: '19pt Arial', 
    dataPointFont: '10pt Arial',
    renderTypes: [LineChart.renderType.lines, LineChart.renderType.points],
    dataPoints: [{ x: '2001', y: 1.020022 }, 
                 { x: '2002', y: 1.025584 }, 
                 { x: '2003', y: 1.0556576 }, 
                 { x: '2004', y: 1.109541 },
                 { x: '2005', y: 1.1751333 },
                 { x: '2006', y: 1.2494588 }, 
                 { x: '2007', y: 1.3368738 },
                 { x: '2008', y: 1.3576401 },
                 { x: '2009', y: 1.394387 }, 
                 { x: '2010', y: 1.475302 },
                 { x: '2011', y: 1.540520 }, 
                 { x: '2012', y: 1.610653},
                 { x: '2013', y: 1.686149 }]
    };
  LineChart.render('line_chart', data);
}());
