function getPlots(id) {
    //Read JSON data
    d3.json('samples.json').then(data =>{

        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Getting the top 10 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
      //   console.log(`OTU IDS: ${OTU_id}`)
  
  
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
      //   console.log(`Sample Values: ${samplevalues}`)
      //   console.log(`Id Values: ${OTU_top}`)

        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'},
            type: "bar",
            orientation: "h"
        };
    //create data variable
        var data =[trace];
        
    //Create layout for plot
        var layout ={
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear"
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };
    
    //create bar plot
    Plotly.newPlot("bar",data,layout);

    //Trace bubble chart
        var trace1 = {
            x:samples.otu_ids,
            y:samples.sample_values,
            mode: 'markers',
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };
    //Create layout for bubble plot
        var layout1 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };
    //create bubble plot data variable
        var data1=[trace1];
    Plotly.newPlot('bubble',data1,layout1);    

    });
}

//Create data gather function
function getDemoInfo(id) {
    //Read the json files
    d3.json('data/samples.json').then ((data)=>{
        var metadata=data.metadata;
        console.log(metadata)

        //filter metadata by id
        var result = metadata.filter(meta=>meta.id.toString()===id)[0];

        var demo = d3.select('#sample-metadata');

        demo.html("");

        Object.entries(result).forEach((key)=> {
            demo.append("h5").text(key[0].toUpperCase()+": " + key[1] + "\n");

        });

    });
}

//create function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
    buildGauge(id);

}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
        buildGauge(data.names[0]);
    });
}

init();