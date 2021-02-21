<template>
  <el-menu
    :default-openeds="['1']"
    :default-active="defaultActive"
    :router="true"
  >
    <template v-for="(menu, index) in menus">
      <el-menu-item :key="menu.name" v-if="menu.href && menu.name">
        <a :href="menu.href" target="_blank">{{ menu.name }}</a>
      </el-menu-item>

      <el-submenu :index="index + ''" v-if="menu.children" :key="menu.name">
        <template slot="title">
          <span>{{ menu.name }}</span>
        </template>

        <el-menu-item
          v-for="(item, index) in menu.children"
          :key="index"
          :index="'/guide' + item.path"
          >{{ item.name }}</el-menu-item
        >
      </el-submenu>

      <el-submenu :index="index + ''" v-if="menu.groups" :key="menu.name">
        <template slot="title">
          <span>{{ menu.name }}</span>
        </template>
        <div v-for="(group, index) in menu.groups" :key="index">
          <div class="menu-group__title">{{ group.groupName }}</div>
          <el-menu-item
            v-for="(item, index) in group.list"
            :key="index"
            :index="'/component' + item.path"
            >{{ item.title }}
          </el-menu-item>
        </div>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>

import menus from './../menu.config'
  export default {
    data () {
      return {
        menus,
        defaultActive: '/guide/install'
      }
    },
    created () {
      const path = this.$route.fullPath
      this.defaultActive = path == '/' ? '/guide/install' : path
    },
  }
</script>

<style scoped lang="scss">
.el-menu {
  border: none;
}

.menu-group__title {
  padding: 0 45px;

  color: #999;
  line-height: 26px;
}
</style>
