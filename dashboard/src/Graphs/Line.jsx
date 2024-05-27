import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Line = ({ serverData }) => {
  const svgRef = useRef(null);
 

  useEffect(() => {
    // Check if serverData.data is an array
    d3.select(svgRef.current).selectAll('*').remove();
    if (Array.isArray(serverData.data) && serverData.data.length > 0) {
      let uniquePestle = [];
      serverData.data.forEach((i) => {
        if (!uniquePestle.includes(i.pestle) && i.pestle !== '') {
          uniquePestle.push(i.pestle);
        }
      });

      const pestleCount = uniquePestle.map((item) => {
        return {
          pestle: item,
          count: serverData.data.filter((i) => i.pestle === item).length,
        };
      });

      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };

      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(uniquePestle);

      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(pestleCount, (d) => d.count)]);

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append('g').call(d3.axisLeft(y));

      svg
        .selectAll('.line')
        .data([pestleCount])
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x((d) => x(d.pestle))
            .y((d) => y(d.count))
            .curve(d3.curveMonotoneX)
        );
    } else {
      console.log('serverData is not an array');
    }
  }, [serverData.data]);

  return <svg ref={svgRef}></svg>;
};

export default Line;