"use client";

import dynamic from "next/dynamic";
import { useProjectStore } from "@/lib/project-store";

// Lazy-load every step to keep initial bundle small
const ProjectShell      = dynamic(() => import("@/components/project/ProjectShell"), { ssr: false });
const StepProjectType   = dynamic(() => import("@/components/project/steps/StepProjectType"));
const StepScope         = dynamic(() => import("@/components/project/steps/StepScope"));
const StepUpload        = dynamic(() => import("@/components/project/steps/StepUpload"));
const StepProcessing    = dynamic(() => import("@/components/project/steps/StepProcessing"));
const StepStyles        = dynamic(() => import("@/components/project/steps/StepStyles"));
const StepGeneration    = dynamic(() => import("@/components/project/steps/StepGeneration"));
const StepResults       = dynamic(() => import("@/components/project/steps/StepResults"));
const StepMaterials     = dynamic(() => import("@/components/project/steps/StepMaterials"));
const StepDelivery      = dynamic(() => import("@/components/project/steps/StepDelivery"));
const StepTeams         = dynamic(() => import("@/components/project/steps/StepTeams"));
const StepSummary       = dynamic(() => import("@/components/project/steps/StepSummary"));
const StepContract      = dynamic(() => import("@/components/project/steps/StepContract"));

const STEPS = [
  StepProjectType,
  StepScope,
  StepUpload,
  StepProcessing,
  StepStyles,
  StepGeneration,
  StepResults,
  StepMaterials,
  StepDelivery,
  StepTeams,
  StepSummary,
  StepContract,
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
