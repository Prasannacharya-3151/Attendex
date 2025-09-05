import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface SectionTabsProps {
  activeSection: 'A' | 'B' | 'C' | 'ALL';
  onSectionChange: (section: 'A' | 'B' | 'C' | 'ALL') => void;
  sectionCounts: {
    A: number;
    B: number;
    C: number;
    ALL: number;
  };
}

export const SectionTabs = ({
  activeSection,
  onSectionChange,
  sectionCounts,
}: SectionTabsProps) => {
  return (
    <Tabs value={activeSection} onValueChange={(value) => onSectionChange(value as 'A' | 'B' | 'C' | 'ALL')}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="ALL" className="flex items-center gap-2">
          All
          <Badge variant="secondary" className="text-xs">
            {sectionCounts.ALL}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="A" className="flex items-center gap-2">
          Section A
          <Badge variant="secondary" className="text-xs">
            {sectionCounts.A}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="B" className="flex items-center gap-2">
          Section B
          <Badge variant="secondary" className="text-xs">
            {sectionCounts.B}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="C" className="flex items-center gap-2">
          Section C
          <Badge variant="secondary" className="text-xs">
            {sectionCounts.C}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};