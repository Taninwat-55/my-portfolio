import React, { useState } from 'react'; // FIX: Import React
import { skills, Skill } from '../data/skills';
import { FaCheckCircle, FaCircle, FaTerminal, FaReact, FaJs, FaHtml5, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';

const IconMap: Record<string, React.ReactNode> = {
  'FaReact': <FaReact className='text-sky-400' />,
  'FaJs': <FaJs className='text-yellow-400' />,
  'SiTailwindcss': <SiTailwindcss className='text-teal-400' />,
  'FaHtml5': <FaHtml5 className='text-orange-500' />,
  'FaNodeJs': <FaNodeJs className='text-green-500' />,
  'TbSql': <TbSql className='text-indigo-400' />,
  'FaGitAlt': <FaGitAlt className='text-orange-600' />,
  'SiTypescript': <SiTypescript className='text-blue-600' />,
  'SiNextdotjs': <SiNextdotjs className='text-white' />
};

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full content-center">
      
      {/* Left: Skill Grid */}
      <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 content-center">
        {skills.map((skill) => (
          <div
            key={skill.name}
            onClick={() => setSelectedSkill(skill)}
            className={`
              p-4 border rounded cursor-pointer transition-all duration-300 group
              ${selectedSkill?.name === skill.name 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-dark-base border-text/10 text-text/60 hover:border-primary/50 hover:text-text'}
            `}
          >
            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {IconMap[skill.iconName] || <FaCircle />}
            </div>
            <h3 className="font-heading text-sm font-bold">{skill.name}</h3>
            <div className="w-full bg-gray-700 h-1 mt-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-yellow-500 h-full" 
                style={{ width: `${skill.level * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right: Terminal Details View */}
      <div className="lg:col-span-5 h-full flex flex-col">
        <div className="flex-1 bg-black/50 border border-text/20 rounded p-6 font-code text-sm overflow-y-auto custom-scrollbar relative">
          
          {/* Terminal Header */}
          <div className="absolute top-0 left-0 w-full bg-text/5 border-b border-text/10 px-4 py-2 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-text/30">bash -- skill_inspector</span>
          </div>

          <div className="mt-8 space-y-4">
            {!selectedSkill ? (
              <div className="text-text/50 flex flex-col items-center justify-center h-64">
                <FaTerminal className="text-4xl mb-4 opacity-20" />
                <p>{'>'} SELECT_MODULE_TO_INSPECT...</p>
                <p className="animate-pulse">{'>'} _</p>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-green-400">user@portfolio:~$</span> inspect <span className="text-primary">{selectedSkill.name}</span>
                </div>
                
                <div className="pl-4 border-l-2 border-text/10">
                  <p className="text-text/80 mb-4">"{selectedSkill.description}"</p>
                  
                  <div className="mb-4">
                    <p className="text-primary mb-1"># PROJECTS_USED:</p>
                    <p className="text-text/60">[{selectedSkill.projects.join(', ')}]</p>
                  </div>

                  <div>
                    <p className="text-primary mb-2"># COMPETENCIES:</p>
                    {selectedSkill.topics.map((group) => (
                      <div key={group.group} className="mb-3">
                        <p className="text-text/40 text-xs mb-1">// {group.group}</p>
                        {group.items.map((item) => (
                          <div key={item.name} className="flex items-center gap-2 pl-2">
                            {item.completed ? 
                              <FaCheckCircle className="text-green-500 text-[10px]" /> : 
                              <FaCircle className="text-text/20 text-[10px]" />
                            }
                            <span className={item.completed ? "text-text/80" : "text-text/40"}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;