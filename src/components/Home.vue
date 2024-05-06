<template>
  <div style="width: 550px; padding: 2px; overflow: auto">
    <a-tree
    blockNode
    expand-all
    :checkable="false"
    :data="treeData"
    >
      <template #extra="nodeData">
        <IconToBottom
              style="position: absolute; right: 8px; left: 505px; font-size: 12px; top: 10px; color: #3370ff;"
              @click="() => onIconDownClick(nodeData)"  v-if="!nodeData.isDir"
            />
        <IconDelete
              style="position: absolute; right: 8px; font-size: 12px; top: 10px; color: #3370ff;"
              @click="() => onIconDeleteClick(nodeData)" v-if="!nodeData.isRoot"
            />
        <IconPlus
          style="position: absolute; right: 8px; left: 505px; font-size: 12px; top: 10px; color: #3370ff;"
                @click="() => onIconAddClick(nodeData)"  v-if="nodeData.isDir"
              />
          <div>
              <a-upload :custom-request="uploadRequest"  >
                <template #upload-button>
                  <IconSend
                    style="position: absolute; left: 480px; right: 8px; font-size: 12px; top: 10px; color: #3370ff;"
                          @click="() => onIconUploadClick(nodeData)" v-if="nodeData.isDir"
                        />
                  </template>
              </a-upload>
          </div>
      </template>
    </a-tree>
  </div>
 


  <div style="width: 500px;">

  <a-upload draggable style="position: absolute; width: 400px; left: 560px; top: 10px;" :custom-request="uploadRequest">
    <template #upload-button>
      <div
        style="
        background-color: var(--color-fill-2);
        color: var(--color-text-1);
        border: 1px dashed var(--color-fill-4);
        height: 158px;
        width: 380px;
        border-radius: 2;
        line-height: 158px;
        text-align: center;"
      >
      <icon-plus
      style="color: var(--color-text-3);
      margin-top: 50px;
      margin-bottom: 0px;"
       size="18" />
        <div style="color: var(--color-text-3);
        position: relative;
        text-align: center;
        top: -40px;">
        点击或拖动文件到该区域来上传至根目录
        </div>
      </div>
    </template>
  </a-upload>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      新建文件夹
    </template>
    <div style="text-align: center;">
      <a-input :style="{width:'320px'}" placeholder="文件夹名称" allow-clear v-model="newNodeName" />
    </div>
  </a-modal>
</template>
  
  <script>
  import { Message } from '@arco-design/web-vue'
  import { ref } from 'vue';
  import { IconArrowDown, IconDelete, IconPlus, IconSend, IconToBottom } from '@arco-design/web-vue/es/icon';
  

  export default {
    components: {
      IconToBottom,
     IconPlus,
     IconSend,
     IconDelete
   },
    setup() {
      const treeData = ref(defaultTreeData);
      const checkedKeys = ref([]);
      const checked = ref(false);
      const visible = ref(false);
      const curNodeData = ref({});
      const newNodeName = ref("");

      const handleClick = () => {
        visible.value = true;
      };
      const handleOk = () => {
        visible.value = false;
        if (newNodeName.value === "") {
          return
        } 
        if (curNodeData.value.key === "0") {
          return 
        }
        fetch("http://localhost:9080/api/private/operator", {
        method: 'Post',
        mode: 'cors',
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({
          "name": newNodeName.value,
          "parent": curNodeData.value.key,
          "kind": 1,
          "operator_code": 0
        })
        }).then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          if (data.code === 0) {
            Message.success(data.msg)
            updateTree()
          } else {
            Message.error(data.msg)
          }
        })
        .catch(error => {
          console.log(error)
          Message.error("新建失败")
        });
        curNodeData.value = {}
        newNodeName.value = ""
      };
      const handleCancel = () => {
        visible.value = false;
        newNodeName.value = ""
      }
      
      function updateTree() {
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
            treeData.value = [...treeData.value];
            console.log(treeData.value)
          } else {
            Message.error(data.msg)
          }
        })
        .catch(error => {
          console.log(error)
          Message.error("获取数据失败")
        });
      };
      updateTree();

      function onIconAddClick(nodeData) {
        curNodeData.value = nodeData;
        handleClick()
      }

      function onIconUploadClick(nodeData) {
        curNodeData.value = nodeData;
      };

      function onIconDeleteClick(nodeData) {
        fetch("http://localhost:9080/api/private/operator", {
        method: 'Post',
        mode: 'cors',
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({
          "id": nodeData.key,
          "kind": 1,
          "operator_code": 1
        })
        }).then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          if (data.code === 0) {
            Message.success(data.msg)
            updateTree()
          } else {
            Message.error(data.msg)
          }
        })
        .catch(error => {
          console.log(error)
          Message.error("操作失败")
        });
      }

      function onIconDownClick(nodeData) {
        let nd = nodeData;
        fetch("http://localhost:9080/api/private/download?id=" + nodeData.key, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
        },
        }).then(response => {
          // 确保响应的状态是OK的
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // 返回一个可以处理文件内容的Promise
          return response.blob();
        })
        .then(blob => {
          console.log(nd)
          // 创建一个临时的URL指向下载的文件
          const downloadUrl = window.URL.createObjectURL(blob);
          // 创建一个a标签用于触发下载
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = downloadUrl;
          // 设置下载的文件名
          a.download = nodeData.title;
          // 将a标签添加到文档中
          document.body.appendChild(a);
          // 触发点击事件开始下载
          a.click();
          // 移除a标签并撤销临时URL
          document.body.removeChild(a);
          window.URL.revokeObjectURL(downloadUrl);
        })
        .catch(error => {
          console.log(error)
          Message.error("下载失败")
        });
      }

      const uploadRequest = (option) => {
        let parent = curNodeData.value.key == undefined ? treeData.value[0].key : curNodeData.value.key;
        const {onProgress, onError, onSuccess, fileItem, name} = option
        const xhr = new XMLHttpRequest();
        if (xhr.upload) {
          xhr.upload.onprogress = function (event) {
            let percent;
            if (event.total > 0) {
              // 0 ~ 1
              percent = event.loaded / event.total;
            }
            onProgress(percent, event);
          };
        }
        xhr.onerror = function error(e) {
          onError(e);
        };
        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return onError(xhr.responseText);
          }
          onSuccess(xhr.response);
          updateTree();
        };
        const formData = new FormData();
        formData.append('file', fileItem.file);
        formData.append('parent', parent);
        formData.append('name', fileItem.file.name);
        xhr.open('post', 'http://localhost:9080/api/private/upload', true);
        xhr.setRequestHeader('Authorization', localStorage.getItem("Authorization"))
        xhr.send(formData);
        curNodeData.value = {}

        return {
          abort() {
            xhr.abort()
          }
        }
      };
      return {
        treeData,
        checkedKeys,
        checked,
        uploadRequest,
        onIconDownClick,
        onIconAddClick,
        visible,
        newNodeName,
        handleOk,
        handleCancel,
        onIconUploadClick,
        onIconDeleteClick
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
    root.isDir = true;
    root.isRoot = true;
    root.children = [];
    root.expend = true;
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
    child.isDir = true;
    child.expend = true;
    child.isRoot = false;
    if (data.kind == 0) {
      child.isDir = false;
    }
    if (data.Children && data.Children.length > 0) {
      for (let i = 0; i < data.Children.length; i++) {
        child.children.push(trans2TreeChild(data.Children[i]));
      }
    }
    return child;
  }
  </script>