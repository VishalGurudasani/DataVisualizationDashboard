import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Doghnut = ({ serverData }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove();
    if (!Array.isArray(serverData.data)) {
        console.error("serverData.data is not an array");
        
        return; 
      }
    let uniqueSectors = [];
    serverData.data.forEach((i) => {
      if (!uniqueSectors.includes(i.sector) && i.sector !== '') {
        uniqueSectors.push(i.sector);
      }
    });
    let uniqueTopics = [];
    serverData.data.forEach((i) => {
      if (!uniqueTopics.includes(i.topic) && i.topic !== '') {
        uniqueTopics.push(i.topic);
      }
    });
    let uniqueRegion = [];
    serverData.data.forEach((i) => {
      if (!uniqueRegion.includes(i.region) && i.region !== '') {
        uniqueRegion.push(i.region);
      }
    });
    let uniqueCountry = [];
    serverData.data.forEach((i) => {
      if (!uniqueCountry.includes(i.country) && i.country !== '') {
        uniqueCountry.push(i.country);
      }
    });
    let uniqueSource = [];
    serverData.data.forEach((i) => {
      if (!uniqueSource.includes(i.source) && i.source !== '') {
        uniqueSource.push(i.source);
      }
    });
    let uniquePestle = [];
    serverData.data.forEach((i) => {
      if (!uniquePestle.includes(i.pestle) && i.pestle !== '') {
        uniquePestle.push(i.pestle);
      }
    });

    const data = [
      uniqueCountry.length,
      uniqueRegion.length,
      uniqueSource.length,
      uniqueTopics.length,
      uniqueSectors.length,
      uniquePestle.length,
    ];
    const labels = ['Country', 'Region', 'Source', 'Topic', 'Sector', 'Pestle'];
    const width = 600;
    const height = 400;
    const margin = 10;
    const radius = Math.min(width, height) / 2 - margin;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);
    const pie = d3.pie().sort(null).value((d) => d);

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i));

   
    const legend = svg
      .selectAll('.legend')
      .data(labels)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${radius + 20}, ${i * 20})`);

    legend
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', (d, i) => color(i));

    
    legend
      .append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text((d) => d);
  }, [serverData.data]);

  return <svg ref={ref}></svg>;
};

export default Doghnut;