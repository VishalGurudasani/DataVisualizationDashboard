import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Bar = ({ serverData }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove();
    const uniqueSectors = [];
    serverData.data.forEach((i) => {
      if (!uniqueSectors.includes(i.sector) && i.sector !== '') {
        uniqueSectors.push(i.sector);
      }
    });

    const sectorCount = uniqueSectors.map((item) => ({
      sector: item,
      count: serverData.data.filter((i) => i.sector === item).length,
    }));

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(sectorCount.map((d) => d.sector))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sectorCount, (d) => d.count)])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .selectAll('rect')
      .data(sectorCount)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.sector))
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.count))
      .attr('fill', 'steelblue');

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start');

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));
  }, [serverData.data]);

  return <svg ref={ref}></svg>;
};

export default Bar;