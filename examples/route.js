import navConfig from './menu.config'

const loadDocs = function (path) {
  return require(`./docs${path}.md`)
}

const registerRoute = (navConfig) => {
  let route = []

  route.push({
    path: `/`,
    redirect: `/guide/install`,
  })

  navConfig.forEach((nav, index) => {

    if (nav.href) return
    if (nav.groups) {

      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav, '/component')
        })
      })
    } else if (nav.children) {

      nav.children.forEach(nav => {
        addRoute(nav, '/guide')
      })
    } else {
      // addRoute(nav, index)
    }
  })


  function addRoute(page, p) {
    const component = loadDocs(page.path)
    let child = {
      path: p + page.path,
      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    }

    route.push(child)
  }

  return route
}

const routes = registerRoute(navConfig)


export default routes
