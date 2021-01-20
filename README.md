# plotly-challenge
## Belly Button Biodiversity

## Interactive Webpage: https://staceywai.github.io/plotly-challenge/index.html

Built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly
Build Dashboard anlayzing "samples" dataset

1. Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    * values: `sample_values`

    * labels: `otu_ids`

    * hovertext: `otu_labels`


2. Bubble chart that displays each sample.

    * x values: `otu_ids`

    * y values: `sample_values`

    * marker size: `sample_values`

    * marker colors: `otu_ids`

    * text values: `otu_labels`

3. Display the sample metadata, i.e., an individual's demographic information.

4. Display each key-value pair from the metadata JSON object somewhere on the page.

5. Update all of the plots any time that a new sample is selected.


### About the Data

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

