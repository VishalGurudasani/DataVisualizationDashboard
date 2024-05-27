import React, { useState } from "react";
import Bar from "../Graphs/Bar";
import Line from "../Graphs/Line";
import Doughnut from "../Graphs/Doghnut";
import Pgraph from "../Graphs/Pgraph";
import './Accordian.module.css'

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="accordion-item">
    <div className="accordion-header" onClick={onClick}>
      {title}
    </div>
    {isOpen && <div className="accordion-body">{children}</div>}
  </div>
);

const Accordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);


  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      <AccordionItem
        title="Doughnut  - represents number of countries, sectors, topics, pestles, sources, etc are involved"
        isOpen={openIndex === 0}
        onClick={() => toggleAccordion(0)}
      >
        <div>
          <Doughnut serverData={data} />
        </div>
      </AccordionItem>
      <AccordionItem
        title="Bar - represents number of projects in each sector"
        isOpen={openIndex === 1}
        onClick={() => toggleAccordion(1)}
      >
        <Bar serverData={data} />
      </AccordionItem>
      <AccordionItem
        title="Line - represents number of projects as per pestle"
        isOpen={openIndex === 2}
        onClick={() => toggleAccordion(2)}
      >
        <Line serverData={data} />
      </AccordionItem>
      <AccordionItem
        title="Pgraph - represents number of projects as per pestle"
        isOpen={openIndex === 3}
        onClick={() => toggleAccordion(3)}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Pgraph serverData={data} />
        </div>
      </AccordionItem>
    </div>
  );
};

export default Accordion;
