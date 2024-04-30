<template>
    <a-tree
    class="tree-demo"
    draggable
    blockNode
    :checkable="checked"
    :data="treeData"
    />
  </template>
  
  <script>
  import { Message } from '@arco-design/web-vue'
  import { ref } from 'vue';

  export default {
    setup() {
      const treeData = ref(defaultTreeData);
      const checkedKeys = ref([]);
      const checked = ref(false);

      fetch("http://localhost:9080/api/private/tree", {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
        },
      }).then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        if (data.code === 0) {
          Message.success(data.msg)
          treeData.value = trans2TreeData(data.data)
          console.log(treeData.value)
        } else {
          Message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error)
        Message.error("获取数据失败")
      })
      return {
        treeData,
        checkedKeys,
        checked
      }
    }
  };

  const defaultTreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disableCheckbox: true,
          children: [
            {
              draggable: false,
              title: 'Leaf 0-0-2-1 (Drag disabled)',
              key: '0-0-2-1'
            }
          ]
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
            },
          ]
        },
        {
          title: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ]

  function trans2TreeData(data) {
    console.log("in")
    console.log(data)
    let result = [];
    let root = {}
    root.title = data.name;
    root.key = data.id;
    root.children = [];
    result.push(root);
    console.log(root)
    if (data.Children && data.Children.length > 0) {
      for (let i = 0; i < data.Children.length; i++) {
        root.children.push(trans2TreeChild(data.Children[i]));
      }
    } 
    console.log(result);
    return result;
    
  }

  function trans2TreeChild(data) {
    let child = {}
    child.title = data.name;
    child.key = data.id;
    child.children = [];
    if (data.Children && data.Children.length > 0) {
      for (let i = 0; i < data.Children.length; i++) {
        child.children.push(trans2TreeChild(data.Children[i]));
      }
    }
    return child;
  }
  </script>