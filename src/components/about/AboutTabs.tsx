"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  LayoutGroup,
  motion,
  useAnimationControls,
  type AnimationControls,
} from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AboutSkillList from "./AboutSkillList";
import AboutInfo from "./AboutInfo";
import type { SkillSetProps } from "./AboutData";
import { ArrowRight } from "lucide-react";
import {
  aboutItemReveal,
  aboutPanelReveal,
  aboutSkillTiming,
  aboutTabDuration,
} from "./aboutMotion";

const tabOptions = [
  { value: "skillset", label: "Skills and Technologies", shortLabel: "Skills" },
  { value: "info", label: "Personal Information", shortLabel: "Personal info" },
];

const AboutTabs = ({
  skillSet,
  entranceControls,
  sectionActive,
  replayKey,
}: {
  skillSet: SkillSetProps[];
  entranceControls: AnimationControls;
  sectionActive: boolean;
  replayKey: number;
}) => {
  const [selectedTab, setSelectedTab] = useState("skillset");
  const [reduceMotion, setReduceMotion] = useState(true);
  const layoutId = useId();
  const workControls = useAnimationControls();
  const tabsRef = useRef<HTMLDivElement>(null);
  const skillCount = skillSet.reduce(
    (count, group) => count + group.data.length,
    0,
  );
  const workDelay =
    aboutSkillTiming.introDuration +
    Math.max(0, skillCount - 1) * aboutSkillTiming.stagger +
    aboutSkillTiming.duration;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    tabsRef.current
      ?.querySelectorAll<HTMLElement>("[role=tabpanel]")
      .forEach((panel) => {
        panel.toggleAttribute("inert", panel.dataset.state !== "active");
      });
  }, [selectedTab]);

  return (
    <Tabs ref={tabsRef} value={selectedTab} onValueChange={setSelectedTab}>
      <LayoutGroup id={layoutId}>
        <motion.div
          className="flow-root"
          variants={aboutItemReveal}
          initial={false}
          animate={entranceControls}
          custom={0.1}
        >
          <TabsList
            aria-label="About Jay Elemar"
            className="about-tabs-segmented"
          >
            {tabOptions.map(({ value, label, shortLabel }) => (
              <TabsTrigger
                key={value}
                value={value}
                aria-label={label}
                className="focus-visible:ring-foreground/50 data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent"
              >
                {selectedTab === value && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="about-tab-highlight"
                    className="about-tabs-highlight"
                    transition={{
                      layout: {
                        duration: reduceMotion ? 0 : aboutTabDuration,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                  />
                )}
                <span className="about-tabs-label sm:hidden">{shortLabel}</span>
                <span className="about-tabs-label hidden sm:inline">
                  {label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>
      </LayoutGroup>
      {/* Both panels size the same grid row so centered content never shifts. */}
      <div className="grid">
        <TabsContent
          forceMount
          asChild
          value="skillset"
          aria-hidden={selectedTab !== "skillset"}
          tabIndex={selectedTab === "skillset" ? 0 : -1}
          className="visible col-start-1 row-start-1 mt-0 min-w-0 transition-[visibility] duration-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:invisible data-[state=inactive]:duration-200 motion-reduce:transition-none"
        >
          <motion.div
            variants={aboutPanelReveal}
            initial={false}
            animate={selectedTab === "skillset" ? "visible" : "hidden"}
            custom={{
              direction: selectedTab === "info" ? 1 : -1,
              reduce: reduceMotion,
            }}
          >
            <AboutSkillList
              skillSet={skillSet}
              controls={workControls}
              active={selectedTab === "skillset" && sectionActive}
              replayKey={replayKey}
            />
            <motion.a
              href="#projects"
              variants={aboutItemReveal}
              initial={false}
              animate={workControls}
              custom={workDelay}
              onFocus={() => workControls.set("visible")}
              className="about-selected-work inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-forest-ink underline underline-offset-4 transition-colors duration-150 hover:text-foreground"
            >
              View selected work <ArrowRight aria-hidden="true" size={16} />
            </motion.a>
          </motion.div>
        </TabsContent>
        <TabsContent
          forceMount
          asChild
          value="info"
          aria-hidden={selectedTab !== "info"}
          tabIndex={selectedTab === "info" ? 0 : -1}
          className="visible col-start-1 row-start-1 mt-0 min-w-0 transition-[visibility] duration-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:invisible data-[state=inactive]:duration-200 motion-reduce:transition-none md:flex md:flex-col"
        >
          <motion.div
            variants={aboutPanelReveal}
            initial={false}
            animate={selectedTab === "info" ? "visible" : "hidden"}
            custom={{
              direction: selectedTab === "info" ? 1 : -1,
              reduce: reduceMotion,
            }}
          >
            <div className="w-full md:min-h-0 md:flex-1">
              <AboutInfo
                containerStyles="mx-auto w-full max-w-2xl"
                active={selectedTab === "info" && sectionActive}
                replayKey={replayKey}
              />
            </div>
          </motion.div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AboutTabs;
