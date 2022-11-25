function init_graph() {
    let ctx=document.getElementById('chart');
    const Labels = gen;
    let labels=[];
    for (let i=0;i<Labels;i++)
    {
        labels.push((i+1).toString());
    }
    const foodsG = [];
    
    const poisonsG = [];
    for (let i = 0; i < Data.length; i++) {
        foodsG.push(Data[i].foodno);
        poisonsG.push(Data[i].poisno);
    }
    //console.log('data:',Data,'food:',foodsG);
    
    const data = {
        labels: labels,
        datasets: [{
            label: 'Number of Foods',
            data: foodsG,
            fill: false,
            borderColor: 'rgb(24,240,24)',
            tension: 0.1
        },{
            label:'Number of Poison',
            data:poisonsG,
            fill:false,
            borderColor:'rgb(240,24,24)',
            tension:0.1,
        }
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    
    new Chart(ctx,config,);
}
