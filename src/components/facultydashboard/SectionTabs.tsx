import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface SectionTabsProps {
  activeSection: "A" | "B" | "C" | "ALL";
  onSectionChange: (section: "A" | "B" | "C" | "ALL") => void;
  sectionCounts: { A: number; B: number; C: number; ALL: number };
}

export const SectionTabs = ({ activeSection, onSectionChange, sectionCounts }: SectionTabsProps) => {
  return (
    <Tabs
      value={activeSection}
      onValueChange={(v) => onSectionChange(v as "A" | "B" | "C" | "ALL")}
      className="w-full"
    >
      <TabsList
        className="
          w-full
          grid grid-cols-2 sm:grid-cols-4
          gap-2 sm:gap-0
          overflow-x-auto sm:overflow-visible
          scrollbar-hide
        "
      >
        <TabsTrigger
          value="ALL"
          className="flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          All{" "}
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
            {sectionCounts.ALL}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="A"
          className="flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Section A{" "}
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
            {sectionCounts.A}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="B"
          className="flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Section B{" "}
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
            {sectionCounts.B}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="C"
          className="flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Section C{" "}
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
            {sectionCounts.C}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
