import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Pgraph = ({ serverData }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    let uniquePestle = [];
    serverData.data.forEach((i) => {
      if (!uniquePestle.includes(i.pestle) && i.pestle !== "") {
        uniquePestle.push(i.pestle);
      }
    });

    const pestleCount = uniquePestle.map((item) => ({
      pestle: item,
      count: serverData.data.filter((i) => i.pestle === item).length,
    }));
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.count);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const g = svg
      .selectAll(".arc")
      .data(pie(pestleCount))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d, i) => color(i));
    g.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text((d) => d.data.pestle);

    
  }, [serverData.data]);

  return <svg ref={ref}></svg>;
};

export default Pgraph;
