// https://github.com/raexera/raexera.github.io/blob/5d200c9604936a2b9fc559c613c306803c9043ee/src/components/Skills.astro
// Credit to this dude; 
// his site is crazy buisness;  
import { skills } from "../skills.json";

function Skills() {
  const list_style_1 = "font-bold bg-[#333] text-base mr-2";

  const { programming_languages, frameworks, databases, tools } = skills;

  const skillCategories = [
    { title: "Programming Languages", items: programming_languages },
    { title: "Libraries / Frameworks", items: frameworks },
    { title: "Database", items: databases },
    { title: "Tools", items: tools },
  ];

  return (
    <>      
      <section id="component-content" className="mt-20 w-1/2 h-[400px]">
        <div id="personal-goals-main" className="border-2 border-[#cdd6f4] backdrop-blur-md p-8 rounded-2xl w-[800px] h-[400px] flex flex-col mt-6 ml-[8%] w-[84%] bg-black/30">
          <div id="personal-goals-header-line" className="flex items-center mb-4">
            <div id="personal-goals-header" className="text-2xl p-4 font-bold text-black text-white">About Me</div>
            <div className="h-0.5 flex-grow bg-black/25 dark:bg-white/25"></div>
          </div>
          <div id="personal-goals-content" className="overflow-y-auto pl-4">
            <nav>
              <ul className="text-white list-inside pl-4">
                <li>                    
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </li>
                <li>
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </li>
                <li>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div id="personal-goals-main" className="border-2 border-[#cdd6f4] backdrop-blur-md p-8 rounded-2xl w-[800px] h-[250px] flex flex-col mt-6 ml-[8%] w-[84%] bg-black/30">
          <div id="personal-goals-header-line" className="flex items-center mb-4">
            <div id="personal-goals-header" className="text-2xl p-4 font-bold text-black text-white">Personal Goals</div>
            <div className="h-0.5 flex-grow bg-black/25 dark:bg-white/25"></div>
          </div>
          <div id="personal-goals-content" className="overflow-y-auto pl-4">
            <nav>
              <ul className="text-white list-inside pl-4">
                <li>
                  Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-2 border-[#cdd6f4] backdrop-blur-md p-8 rounded-2xl w-[800px] mt-6 ml-[8%] w-[84%] bg-black/30">
          <div className="flex items-center mb-4">
            <div className="text-2xl p-4 font-bold text-white">Skills</div>
            <div className="h-0.5 flex-grow bg-black/25 dark:bg-white/25"></div>
          </div>
          <div className="flex flex-col space-y-4">
            {skillCategories.map(({ title, items }) => (
              <div key={title} className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-full text-sm font-bold text-white/80 sm:w-48">{title}</span>
                <span className="hidden px-2 sm:inline-block">:</span>
                <ul className="flex flex-1 flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className="inline-flex items-center rounded-md border border-white/25 bg-neutral-800/50 px-2 py-1 text-xs text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
   );
}
export default Skills;