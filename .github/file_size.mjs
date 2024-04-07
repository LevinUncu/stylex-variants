import { generateFileSizeReport } from '@jsenv/file-size-impact';

export const fileSizeReport = await generateFileSizeReport({
  log: process.argv.includes('--log'),
  rootDirectoryUrl: new URL('../library/', import.meta.url),
  trackingConfig: {
    dist: {
      './dist/**/*.js': true,
      './dist/**/*.cjs': true,
    },
  },
});
