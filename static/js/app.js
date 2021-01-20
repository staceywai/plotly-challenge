// Create function for Data plotting (Bar, bubble)
function DataPlots(id) {

    // read in JSON files
    d3.json('data/samples.json').then(data =>{

        console.log(data)

        // filter data samples by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // get top 10 
        var top10_sample = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reverse it. 
        var top_OTU = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu ids to the desired form for the plot
        var OTU_id = top_OTU.map(d => "OTU " + d)
  
        // get top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        var trace1 = {
            x: top10_sample,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(255,176,156)'},
            type: "bar",
            orientation: "h"
        };

    // define data and layout variables to plot bar chart
        var data1 =[trace1];
        
        var layout_bar ={
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
    
    // plot bar chart
    Plotly.newPlot("bar",data1,layout_bar);

    // define new trace and layout variables to plot bubble chart
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: 'markers',
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };
 
        var layout_bub = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };
    // plot bubble chart
        var data2=[trace2];
    Plotly.newPlot('bubble',data2,layout_bub);    

    });
}

// Create function to pull Demo data
function DemoData(id) {

    // Read in JSON files
    d3.json('data/samples.json').then ((data)=>{

        // get metadata info for demopgraphic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter metadata by id
        var result = metadata.filter(meta=>meta.id.toString()===id)[0];

        // select demogrpahic panel to put data
        var demoInfo = d3.select('#sample-metadata');

        // empty demo info panel each time before getting new ID info
        demoInfo.html("");

        // append neccessary demo data for IDs to info panel
        Object.entries(result).forEach((key)=> {
            demoInfo.append("h5").text(key[0].toUpperCase()+": " + key[1] + "\n");

        });

    });
}

// create function for the change event
function optionChanged(id) {
    DataPlots(id);
    DemoData(id);

}

// initialize data rendering
function init() {
    var dropdown = d3.select("#selDataset");

    // read JSON data
    d3.json('data/samples.json').then((data)=> {

        console.log(data)

        // add IDs to dropdown menu
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        // call functions to display data and plots to page
        DataPlots(data.names[0]);
        DemoData(data.names[0]);

    });
}

init();