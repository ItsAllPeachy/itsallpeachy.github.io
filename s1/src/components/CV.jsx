import { useEffect, useState } from "react";

import ImageSlider from "./ImageRotator";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Typography from '@mui/material/Typography';

import { skills } from "./skills.json";
const { programming_languages, frameworks, databases, tools } = skills;

const skillCategories = [
    { title: "Programming Languages", items: programming_languages },
    { title: "Libraries / Frameworks", items: frameworks },
    { title: "Database", items: databases },
    { title: "Tools", items: tools },
];

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
    '&::before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
      transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
  }));  

var array_position = 1;

function Skills(){
    return(
        <>
        <section className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex flex-col space-y-4 flex-1">
          <h1 className="font-extrabold text-transparent p-8 bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(2rem,6vw,3rem)]">
            Skills: 
          </h1>  
            {skillCategories.map(({ title, items }) => (
              <div className="flex flex-col pr-8 pb-8 pl-8 sm:flex-row sm:items-center" key={title}>
                <span className="w-full text-sm font-bold text-black/80 dark:text-white/80 sm:w-48">{title}</span>
                <span className="hidden px-2 sm:inline-block">:</span>
                <ul className="flex flex-1 flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className="inline-flex items-center rounded-md border border-black/25 bg-neutral-200/50 px-2 py-1 text-xs text-black/80 dark:border-white/25 dark:bg-neutral-800/50 dark:text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center self-center mr-20">
            <ImageSlider className="m-20" />
          </div>
        </section>
      </>
    );
}

function Goals() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [activeTab, setActiveTab] = useState("Write For Change");
    const [activeIndex, setActiveIndex] = useState(null);
    
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
      
        const tabs = [
            { name: "Write For Change", content: "I would like to improve my writing, with a long term goal of sharing ideas on topics I am passionate about, in particular topics relating to Social Justice, Equality, and the key principles behind socialism and leftist theory. I aim to use my voice to challenge the remaining apartheid era inequality that is prevalent in a post-segregation South Africa and promote collective progress", img: "/src/assets/about/WFC-1.png", imgclass: "p-1 mt-10 rounded-2xl h-100 w-100 border-2 mx-auto" },
            { name: "Expand My Knowledge", content: "Never stop learning; I am committed to always being a student of the world, especially in the realms of political theory, history, and political activism", img: "/src/assets/about/EMK-1.png", imgclass: "p-1 mt-10 rounded-2xl border-2 mx-auto" },
            { name: "Contribute to Open Source", content: "I would like to collaborate with other people on FOSS projects to learn, grow, and give back to the community that made me who i am today; This is in line with my belief in collective action and shared resources", img: "https://ghchart.rshah.org/ItsAllPeachy", imgclass: "p-2 mt-10 rounded-2xl mx-auto" },
            { name: "Promote Social and Economic Equality", content: "I would like to embrace the principles of socialism both in my professional life by advocating for systems that empower all people, ensuring access to the resources and opportunities needed for people to collectively thrive; As a nation.", img: "/src/assets/about/PSEE-1.png", imgclass: "p-1 mt-10 rounded-2xl h-100 w-100 border-2 mx-auto" }
        ];
          
        if (screenWidth > 600) {
            return (
                <div className="w-full p-4 mx-auto mt-8">
                    <div className="flex gap-2 pl-2 pr-2">
                        {tabs.map(tab => <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex-1 box-border border-2 rounded-2xl py-2 px-4 transition duration-300 ${activeTab === tab.name ? "border-white underline font-semibold" : "border-transparent hover:border-white"}`}>{tab.name}</button>)}
                    </div>
                    <div className="p-4 bg-transparent">
                        {tabs.map(tab => activeTab === tab.name ? <div key={tab.name}><h3 className="text-xl font-bold mb-2">{tab.name}</h3><p>{tab.content}</p> <img className={tab.imgclass} src={tab.img} /> </div> : null)}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {tabs.map((tab, index) => (
                    <Accordion key={index} expanded={activeIndex === index} onChange={() => setActiveIndex(activeIndex === index ? null : index)}>
                        <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                            <Typography component="span">{tab.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component="p">{tab.content}</Typography>
                            <img className={tab.imgclass} src={tab.img} />
                        </AccordionDetails>
                    </Accordion>))}
              </div> 
            );
        }
}     



function AboutMeContent(){
    return (
        <div id="cv-about-me-content">
            <h1 className="justify-center p-4 flex font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(2rem,6vw,3rem)]">
                ABOUT ME
            </h1> 
            <hr className="border-1 border-[#333] " />
            <p className="justify-center p-4">
                I'm a young communist high school student from South Africa with a passion for programming, reading, and writing. Right now, I'm diving into web development while learning some basic Penetration testing. When I'm not writing admittedly unusable code, or writing in general, you will probably find me lost in a book. I like to think of myself as someone curious and always excited to learn something new!
            </p>
            <div className="flex mb-5 mt-5 justify-center">
                <img className="rounded-2xl p-1 border-2 " src="/src/assets/profile.jpeg" width="340" height="340" />
            </div>
        </div>
    )
}

function ContentDisplay(){
  const [array_position, set_array_position] = useState(0);
  const [screen_width, set_screen_width] = useState(window.innerWidth);
  const menus = [<AboutMeContent />, <Goals />, <Skills />];

  useEffect(() => {
      const handleResize = () => set_screen_width(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  const go_forward = () => set_array_position((prev) => (prev + 1) % menus.length);
  const go_backward = () => set_array_position((prev) => (prev - 1 + menus.length) % menus.length);
  const button_style_1 = "border-2 border-[#333] rounded-full p-2 hover:border-[#fff] hover:bg-[#333] transform hover:scale-108 transition duration-500 ease-in-out";

  return ( 
      <section className="flex items-center justify-center text-white pb-[100px">
          <div className="w-[90%] mt-[5%] max-w-[800px] min-h-[3rem] border-2 border-[#333] rounded-2xl bg-transparent backdrop-blur-md">
              <div id="cv-about-me"> 
                  <div id="cv-about-me-content-injection">
                      {menus[array_position]}
                  </div>
                  <hr className="border-1 border-[#333]" />
                  <div className="p-2 relative flex justify-center items-center w-full min-h-[70px] max-w-[900px] mx-auto">
                      <button onClick={go_forward} className="absolute left-[1%]">
                          <img height="58" width="58" className={button_style_1} src="/src/assets/op-prev.svg" />
                      </button>
                      {screen_width >= 356 && (
                          <div id="cv-about-me-buttons" className="flex gap-[5%]">
                              <a href="mailto:filler@email.com?subject=My%20Subject&body=My%20Body">
                                  <img height="58" width="58" className={button_style_1} src="/src/assets/email.svg" />
                              </a>
                              <a href="https://github.com/ItsAllPeachy" target="_blank" rel="noreferrer">
                                  <img height="58" width="58" className={button_style_1} src="/src/assets/github.svg" />
                              </a>
                              <a href="https://www.instagram.com/jordang.astro/?hl=en" target="_blank" rel="noreferrer">
                                  <img height="58" width="58" className={button_style_1} src="/src/assets/instagram.svg" />
                              </a>
                          </div>
                      )}
                      <button onClick={() => { go_forward(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="absolute mx-auto right-[1%]">
                          <img height="58" width="58" className={button_style_1} src="/src/assets/op-next.svg" />
                      </button>
                  </div>
              </div>
          </div>
      </section>
  );
}
function RedArmy(){
    return <ContentDisplay />
}export default RedArmy