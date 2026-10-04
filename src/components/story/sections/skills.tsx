import { skillCategories } from "@/lib/data/skills";
import { ChapterLabel, Panel } from "../manga";
import { ChapterSection } from "../chapter-section";
import { Protagonist } from "../protagonist";

/** Training arc: ability and growth, no fake percentages. */
export function Skills() {
  return (
    <ChapterSection id="skills" state="working" className="scroll-mt-[136px]">
        <>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <ChapterLabel>Chapter 01 · Training</ChapterLabel>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl">
                Skills
              </h2>
              <p className="mt-1 max-w-xl text-sm text-[#555]">
                Training, ability, growth. The tools I reach for every day.
              </p>
            </div>
            <Protagonist className="max-w-[110px] sm:max-w-[130px]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <Panel key={cat.id} as="article">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#111]">{cat.label}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#999]">
                    {cat.skills.length} skills
                  </span>
                </div>
                <p className="mt-1 text-sm italic text-[#666]">{cat.description}</p>
                <ul className="mt-4 divide-y-2 divide-dotted divide-[#ddd]">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="flex items-baseline justify-between gap-3 py-2">
                      <span className="text-sm font-semibold text-[#111]">
                        {skill.name}
                      </span>
                      <span className="text-right text-xs text-[#777]">
                        {skill.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </>
    </ChapterSection>
  );
}
