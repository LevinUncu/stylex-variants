import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';
import conventional from '@commitlint/config-conventional';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    ...conventional.rules,
    'scope-enum': [
      RuleConfigSeverity.Warning,
      'always',
      ['library', 'website'],
    ],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['feat', 'fix', 'refactor', 'test', 'build', 'ci', 'bump'],
    ],
  },
};

export default config;
