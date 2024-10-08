import updateIssueDescription from "@/lib/supabase/update-issue-description";
import updateIssuePlannedEndDate from "@/lib/supabase/update-issue-planned-end-date";
import updateIssuePriority from "@/lib/supabase/update-issue-priority";
import updateIssueProjectId from "@/lib/supabase/update-issue-project-id";
import updateIssueStatus from "@/lib/supabase/update-issue-status";
import updateIssueTitle from "@/lib/supabase/update-issue-title";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issueState } from "@/states/issue-state";
import { issuesState } from "@/states/issues-state";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

export default function useUpdateIssue(isIndividual: boolean) {
  const user = useRecoilValue(userState);
  const projects = useRecoilValue(projectsState);
  const setIssue = useSetRecoilState(issueState);
  const setIssues = useSetRecoilState(issuesState);

  const setIssueTitle = async (issueId: string, newTitle: string) => {
    try {
      if (user) await updateIssueTitle(issueId, newTitle);
      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                title: newTitle,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  title: newTitle,
                }
              : oldIssue,
          ),
        );
      }

      toast.success("Title updated", {
        description: `${newTitle}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssueDescription = async (
    issueId: string,
    issueTitle: string,
    newDescription: string,
  ) => {
    try {
      if (user) await updateIssueDescription(issueId, newDescription);
      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                description: newDescription,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  description: newDescription,
                }
              : oldIssue,
          ),
        );
      }

      toast.success("Description updated", {
        description: `${issueTitle} - ${newDescription}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssueProject = async (
    issueId: string,
    issueTitle: string,
    newProjectId: string | null,
  ) => {
    try {
      const targetProject = projects.find(
        (project) => project.id === newProjectId,
      );
      if (newProjectId && !targetProject) return;

      if (user) await updateIssueProjectId(issueId, newProjectId);
      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                project_id: newProjectId,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  project_id: newProjectId,
                }
              : oldIssue,
          ),
        );
      }

      toast.success("Linked project updated", {
        description: `${issueTitle} - ${newProjectId ? (targetProject ? targetProject.title : "") : "Not set"}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssueStatus = async (
    issueId: string,
    issueTitle: string,
    newStatus: IssueStatus,
  ) => {
    try {
      if (user) await updateIssueStatus(issueId, newStatus);
      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                status: newStatus,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  status: newStatus,
                }
              : oldIssue,
          ),
        );
      }

      toast.success("Status updated", {
        description: `${issueTitle} - ${newStatus}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssuePriority = async (
    issueId: string,
    issueTitle: string,
    newPriority: IssuePriority,
  ) => {
    try {
      if (user) await updateIssuePriority(issueId, newPriority);

      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                priority: newPriority,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  priority: newPriority,
                }
              : oldIssue,
          ),
        );
      }

      toast.success("Priority updated", {
        description: `${issueTitle} - ${newPriority}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setIssuePlannedEndDate = async (
    issueId: string,
    issueTitle: string,
    newPlannedEndDate: Date | null,
  ) => {
    try {
      if (user) await updateIssuePlannedEndDate(issueId, newPlannedEndDate);

      if (isIndividual) {
        setIssue((oldIssue) =>
          oldIssue
            ? {
                ...oldIssue,
                planned_end_date: newPlannedEndDate,
              }
            : null,
        );
      } else {
        setIssues((oldIssues) =>
          oldIssues.map((oldIssue) =>
            oldIssue.id === issueId
              ? {
                  ...oldIssue,
                  planned_end_date: newPlannedEndDate,
                }
              : oldIssue,
          ),
        );
      }
      toast.success("Due date updated", {
        description: `${issueTitle} - ${
          newPlannedEndDate
            ? newPlannedEndDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Not set"
        }`,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setIssueTitle,
    setIssueDescription,
    setIssueProject,
    setIssueStatus,
    setIssuePriority,
    setIssuePlannedEndDate,
  };
}
