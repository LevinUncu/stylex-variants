import {
  reportFileSizeImpactInGitHubPullRequest,
  readGitHubWorkflowEnv,
} from '@jsenv/file-size-impact';

await reportFileSizeImpactInGitHubPullRequest({
  ...readGitHubWorkflowEnv(),
  buildCommand: 'pnpm build',
  fileSizeReportUrl: new URL('./file_size.mjs#fileSizeReport', import.meta.url),
});
