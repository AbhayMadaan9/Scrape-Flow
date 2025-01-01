import { TaskParamType, TaskType } from "@/types/tasks";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs: {
    url: {
      name: "url",
      helperText: "URL",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
    },
  },
};
