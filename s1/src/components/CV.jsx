import { useState } from "react";
import { skills } from "../skills.json";
import ImageSlider from "./ImageRotator";
const img_class_1 = "border-2 border-[#cdd6f4] rounded-3xl shadow-[3px_3px_6px_rgba(255,255,255,0.25)]";

function About() {
  const component_about = (
    <div>
      <h1 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(2rem,6vw,3rem)]">
        About Me
      </h1>   
      <p className="text-white">
        I'm a young communist high school student from South Africa with a passion for programming, reading, and writing. Right now, I'm diving into web development while learning some basic Penetration testing. When I'm not writing admittedly unusable code, or writing in general, you will probably find me lost in a book. I like to think of myself as someone curious and always excited to learn something new!
      </p>
      <div className="flex justify-center items-center bg-transparent border-2 border-[#cdd6f4] mt-8 space-x-4 rounded-2xl backdrop-blur-md p-4 w-fit mx-auto">
        <img className={img_class_1} height="128" width="128" src="/src/assets/prolatarianclassic.png"></img>
        <img className={img_class_1} height="128" width="128" src="/src/assets/profile.jpeg"></img>
        <img className={img_class_1} height="128" width="128" src="/src/assets/prolatarianclassic2.png"></img>
      </div>
    </div>
  );
  return component_about;
}

function TabbedContent() {
  const tab_styles = "bg-transparent p-3 rounded-3xl transition-colors border-transparent border-2 duration-500 ease font-semibold m-2 gap-8 hover:bg-";
  const [activeTab, setActiveTab] = useState("change");
  const renderContent = () => {
    switch (activeTab) {
      case "change":
        return (
          <div>
            <h3 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(1rem,2.5vw,1.5rem)]">Write For Change</h3>
            <p>I would like to improve my writing, with a long term goal of sharing ideas on topics I am passionate about, in particular topics relating to Social Justice, Equality, and the key principles behind socialism and leftist theory. I aim to use my voice to challenge the remaining apartheid era inequality that is prevalent in a post-segregation South Africa and promote collective progress </p>
          </div>
        );
      case "expand":
        return (
          <div>
            <h3 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(1rem,2.5vw,1.5rem)]">
              Expand My Knowledge
            </h3>
            <p>
              Never stop learning; I am committed to always being a student of the world, especially in the realms of political theory, history, and political activism
            </p>
          </div>
        );
      case "contribute":
        return (
          <div>
            <h3 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(1rem,2.5vw,1.5rem)]">Contribute To Free and Open Source Projects</h3>
            <p>
              I would like to collaborate with other people on FOSS projects to learn, grow, and give back to the community that made me who i am today; This is in line with my belief in collective action and shared resources 
            </p>
          </div>
        );
      case "promote":
        return (
          <div>
            <h3 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(1rem,2.5vw,1.5rem)]">Promote Social and Economic Equality</h3>
            <p>
              I would like to embrace the principles of socialism both in my professional life by advocating for systems that empower all people, ensuring access to the resources and opportunities needed for people to collectively thrive; As a nation. 
            </p>
          </div>
        );
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div className="border-2 border-[#cdd6f4] rounded-3xl shadow-[3px_3px_6px_rgba(255,255,255,0.25)]">
      <div className="flex justify-center flex-wrap gap-2">
        <button onClick={() => setActiveTab("change")} className={`${tab_styles} ${activeTab === "change" ? "bg-white font-bold text-black underline" : "hover:bg-black hover:border-white hover:text-white"}`}>
          Write for Change
        </button>
        <button onClick={() => setActiveTab("expand")} className={`${tab_styles} ${activeTab === "expand" ? "bg-white font-bold text-black underline" : "hover:bg-black hover:border-white hover:text-white"}`}>
          Expand My Knowledge
        </button>
        <button onClick={() => setActiveTab("contribute")} className={`${tab_styles} ${activeTab === "contribute" ? "bg-white font-bold text-black underline" : "hover:bg-black hover:border-white hover:text-white"}`}>
          Contribute to FOSS
        </button>
        <button onClick={() => setActiveTab("promote")} className={`${tab_styles} ${activeTab === "promote" ? "bg-white font-bold text-black underline" : "hover:bg-black hover:border-white hover:text-white"}`}>
          Promote Equality
        </button>
      </div>
      <div className="p-4 border-t border-gray-300">{renderContent()}</div>
    </div>
  );
}

function Goals() {
  const component_goals = (


    <div>
      <h1 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(2rem,6vw,3rem)]">
        Goals  
      </h1> 
      <TabbedContent />
      <div className="flex justify-center items-center bg-transparent border-2 border-[#cdd6f4] mt-8 space-x-4 rounded-2xl backdrop-blur-md p-4 w-fit mx-auto">
        <img className={img_class_1} height="128" width="128" src="/src/assets/prolatarianclassic.png"></img>
        <img className={img_class_1} height="128" width="128" src="/src/assets/profile.jpeg"></img>
        <img className={img_class_1} height="128" width="128" src="/src/assets/prolatarianclassic2.png"></img>
      </div>
    </div>
  );
  return component_goals;
}

function Skills() {
  const { programming_languages, frameworks, databases, tools } = skills;

  const skillCategories = [
    { title: "Programming Languages", items: programming_languages },
    { title: "Libraries / Frameworks", items: frameworks },
    { title: "Database", items: databases },
    { title: "Tools", items: tools },
  ];
  
  const component_skills = (
    <>
      <section className="flex flex-col sm:flex-row gap-8 items-start" id="POES">
        <div className="flex flex-col space-y-4 flex-1">
        <h1 className="font-extrabold text-transparent bg-gradient-to-b from-gray-200 to-gray-400 leading-tight tracking-tight bg-clip-text text-[clamp(2rem,6vw,3rem)]">
          Skills: 
        </h1>  
          {skillCategories.map(({ title, items }) => (
            <div className="flex flex-col sm:flex-row sm:items-center" key={title}>
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
        <div className="flex items-center self-center mr-30">
          <ImageSlider />
        </div>
      </section>
    </>
  );
  return component_skills;
}

const Redarmy = () => {
  const [index, setIndex] = useState(0);
  const components = [
    <About />,
    <Goals />,
    <Skills />,
  ];

  const goLeft = () => {
    console.log("goleft")
    setIndex((prevIndex) => (prevIndex === 0 ? components.length - 1 : prevIndex - 1));
  };

  const goRight = () => {
    console.log("goright")
    setIndex((prevIndex) => (prevIndex === components.length - 1 ? 0 : prevIndex + 1));
  };

  const menu = (
    <section className="flex justify-center items-center min-h-screen w-full px-4 py-8">
      <div className="flex items-center w-full max-w-[70%]">
        <button onClick={goLeft} className="bg-transparent p-2 rounded-full transition-colors duration-500 ease hover:bg-[#333] border-2 border-white">
          <img height="48" width="48" src="/src/assets/action-paging-prev-svgrepo-com.svg" />
        </button>
        <div className="flex-1 shadow-[3px_3px_6px_rgba(255,255,255,0.25)] bg-transparent border-2 border-[#cdd6f4] backdrop-blur-md px-4 sm:px-6 py-6 sm:py-8 rounded-2xl mx-4 flex flex-col items-center justify-center gap-6">
          <div className="text-white w-full text-center space-y-4">
            {components[index]}
          </div>
        </div>
        <button onClick={goRight} className="bg-transparent p-2 rounded-full transition-colors duration-500 ease hover:bg-[#333] border-2 border-white">
          <img height="48" width="48" src="/src/assets/next-svgrepo-com.svg" />
        </button>
      </div>
    </section>
  );
  return menu;
};
export default Redarmy;