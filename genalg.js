function MatingPool(vehicles) {
    let matingpool=[];
    for(let i=0;i<vehicles.length;i++)
    {
        let n=vehicles[i].health*100;
        for (let j=0;j<n;j++)
        {
            matingpool.push(vehicles[i]);
        }
    }
    return matingpool;
}

function CalculateFitness(vehicles) {
    let maxFit = 0
    let minFit=vehicles[0].health;
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].health > maxFit) {
            maxFit = vehicles[i].health;
        }
        if (vehicles[i].health < minFit) {
            minFit = vehicles[i].health;
        }
    }
    for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].health=(vehicles[i].health-minFit)/(maxFit-minFit+1);
        //console.log(vehicles[i].health);
    }
    
}
