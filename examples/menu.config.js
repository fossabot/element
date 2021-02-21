const menus = [
  // {
  //   "name": "Element React",
  //   "href": "https://elemefe.github.io/element-react/"
  // },

  {
    name: '指南',
    children: [
      { name: '使用', path: '/install', default: true },
    ]
  },
  {
    name: '组件',
    groups: [
      {
        groupName: 'Basic',
        list: [
          { title: '快速上手', path: '/layout' },
          { title: 'Container 布局容器', path: '/container' },
          { title: 'Button 按钮', path: '/button' }
        ]
      },
      {
        groupName: 'Navigation',
        list: [
          { title: 'NavMenu 导航菜单', path: '/menu' },
        ]
      },

      {
        groupName: 'Others',
        list: [
          { title: 'Dialog 对话框', path: '/dialog' },
        ]
      },
      {
        groupName: 'upload',
        list: [
          { title: 'Upload 上传', path: '/upload' },
        ]
      },
    ]
  },
]

export default menus
