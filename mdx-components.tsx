import Pagination from '@/app/_components/Pagination';
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import { MDXComponents } from 'nextra/mdx-components';
 
// Get the default MDX components
const themeComponents = getThemeComponents()

const CustomComponents = { Pagination };

export function useMDXComponents(components: MDXComponents) {
  return {
    ...CustomComponents,
    ...themeComponents,
    ...components
  };
}
