import IssueOverview from "@/components/issue-overview";
import IssueStatusBadge from "@/components/issue-status-badge";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issuesState } from "@/states/issues-state";
import { useDroppable } from "@dnd-kit/core";
import { useRecoilValue } from "recoil";

type Props = {
  status: IssueStatus;
  activeIssueId: string | null;
  setActiveIssueId: (value: string | null) => void;
};

export default function StatusIssues({
  status,
  activeIssueId,
  setActiveIssueId,
}: Props) {
  const issues = useRecoilValue(issuesState);
  const filteredIssues = issues.filter((issue) => issue.status === status);

  const { setNodeRef, isOver } = useDroppable({
    id: status.toString(),
  });

  return (
    <div
      className={`flex w-96 shrink-0 flex-col gap-y-2 rounded-lg p-2 ${isOver ? "bg-gray-200" : "bg-gray-50"}`}
    >
      <div className="flex items-center gap-x-1.5">
        <IssueStatusBadge status={status} />
        <span>{status}</span>
      </div>
      <div className="flex flex-col gap-y-2" ref={setNodeRef}>
        {filteredIssues.map((issue, index) => (
          <IssueOverview key={index} issue={issue} />
        ))}
      </div>
    </div>
  );
}
