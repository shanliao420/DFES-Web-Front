<template>
    <a-space direction="vertical">
      <a-breadcrumb :routes="tree">
        <template #item-render="{route, paths}">
          <a-link >
            {{route.label}}
          </a-link>
        </template>
      </a-breadcrumb>
    </a-space>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tree: [
          {
            path: '/home',
            label: 'shanliao-space'
          },
          {
            path: '/',
            label: 'Login',
          },
          {
            path: '/register',
            label: 'Register'
          },
        ],
      }
    }
  }
  </script>