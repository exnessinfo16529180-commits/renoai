"use client";

import dynamic from "next/dynamic";
import { useProjectStore } from "@/lib/project-store";

// Lazy-load every step to keep initial bundle small
const ProjectShell   = dynamic(() => import("@/components/project/ProjectShell"),          { ssr: false });
const StepUpload     = dynamic(() => import("@/components/project/steps/StepUpload"));     // 1 Upload
const StepStyles     = dynamic(() => import("@/components/project/steps/StepStyles"));     // 2 Style
const StepGeneration = dynamic(() => import("@/components/project/steps/StepGeneration")); // 3 Visualization
const StepResults    = dynamic(() => import("@/components/project/steps/StepResults"));    // 4 Customization
const StepEstimate   = dynamic(() => import("@/components/project/steps/StepEstimate"));   // 5 Estimate
const StepBudget     = dynamic(() => import("@/components/project/steps/StepBudget"));     // 6 Budget
const StepMaterials  = dynamic(() => import("@/components/project/steps/StepMaterials"));  // 7 Materials
const StepTeams      = dynamic(() => import("@/components/project/steps/StepTeams"));      // 8 Contractors
const StepProgress   = dynamic(() => import("@/components/project/steps/StepProgress"));   // 9 Progress

const STEPS = [
  StepUpload,     // 1
  StepStyles,     // 2
  StepGeneration, // 3
  StepResults,    // 4
  StepEstimate,   // 5
  StepBudget,     // 6
  StepMaterials,  // 7
  StepTeams,      // 8
  StepProgress,   // 9
];

export default function ProjectPage() {
  const currentStep = useProjectStore((s) => s.currentStep);
  const StepComponent = STEPS[Math.min(currentStep, STEPS.length) - 1];

  return (
    <ProjectShell>
      <StepComponent />
    </ProjectShell>
  );
}
