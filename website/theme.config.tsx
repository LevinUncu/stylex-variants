import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
  useNextSeoProps: function SEO() {
    const { frontMatter } = useConfig();

    return {
      description: frontMatter.description,
      defaultTitle: 'StyleX Variants',
      titleTemplate: '%s – StyleX Variants',
    };
  },
  logo: <strong>StyleX Variants</strong>,
  project: {
    link: 'https://github.com/levinuncu/stylex-variants',
  },
  docsRepositoryBase: 'https://github.com/levinuncu/stylex-variants',
  footer: {
    component: () => null,
  },
  feedback: {
    content: '',
  },
  editLink: {
    text: '',
  },
};

export default config;
