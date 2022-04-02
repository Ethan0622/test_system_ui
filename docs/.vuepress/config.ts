import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-US',
  title: 'CAT System',
  description: '首页',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      {
        text: 'Github',
        link: 'https://github.com/Ethan0622/test_system_ui',
      },
      {
        text: '后端接口文档',
        link: 'http://121.40.84.189:3001/swagger/',
      },
    ],
    sidebar: [
      {
        text: '概述',
        link: '/',
      },
      {
        text: '基本使用',
        link: '/',
        children: [
          // SidebarItem
          {
            text: '介绍',
            link: '/users/introduce.md',
          },
          {
            text: '学生用户',
            link: '/users/student.md',
          },
          {
            text: '教师用户',
            link: '/users/teacher.md',
          },
        ],
      },
      {
        text: '开发',
        link: '/',
        children: [
          {
            text: '前端开发',
            link: '/developers/front-end.md',
          },
          {
            text: '后端开发',
            link: '/developers/back-end.md',
          },
        ],
      },
    ],
  },
})
