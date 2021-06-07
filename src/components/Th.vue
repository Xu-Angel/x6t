<template>
  <div class="hello">
    <div ref="cr" id="cr"></div>
  </div>
</template>

<script>
import { Graph, Node, Edge, Shape } from '@antv/x6'
import '@antv/x6-vue-shape'
export default {
  name: 'Tr',
  mounted() {
    Graph.registerHTMLComponent(
      'my-html2',
      (node) => {
        const wrap = document.createElement('div')
        wrap.innerHTML = `
  <div style="position:relative;z-index:999">sssss</div>
  `
        return wrap
      },
      true
    )
    class TreeEdge extends Shape.Edge {
      isHidden() {
        const node = this.getTargetNode()
        return !node || !node.isVisible()
      }
    }

    TreeEdge.config({
      zIndex: 1,
      attrs: {
        line: {
          stroke: '#a0a0a0',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    })

    // 注册
    Edge.registry.register('tree-edge', TreeEdge, true)
    const graph = new Graph({
      container: this.$refs.cr,
      height: 1000,
      width: 1000,
      grid: true,
      // frozen: true,
      snapline: true,
    })
    graph.addNode({
      id: 1,
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      shape: 'html',
      html() {
        const wrap = document.createElement('div')
        wrap.style.width = '100%'
        wrap.style.height = '100%'
        wrap.style.background = '#f0f0f0'
        wrap.style.display = 'flex'
        wrap.style.justifyContent = 'center'
        wrap.style.alignItems = 'center'

        wrap.innerText = 'Hello'

        return wrap
      },
    })

    const wrap = document.createElement('div')
    wrap.style.width = '100%'
    wrap.style.height = '100%'
    wrap.style.background = '#f0f0f0'
    wrap.style.display = 'flex'
    wrap.style.justifyContent = 'center'
    wrap.style.alignItems = 'center'
    wrap.innerText = 'World'

    graph.addNode({
      id: 2,
      x: 180,
      y: 160,
      shape: 'html',
      html: wrap,
    })

    graph.addNode({
      id: 3,
      x: 80,
      y: 80,
      shape: 'html',
      data: {
        time: 'sfydsfhu',
      },
      html: {
        render(node) {
          const data = node.getData()
          return `
        <style> .t {color:red; width:100px;height:100px}</style>
        <div class="t">
          <span>${data.time}</span>
        </div>`
        },
        shouldComponentUpdate(node) {
          // 控制节点重新渲染
          return node.hasChanged('data')
        },
      },
    })
    graph.addEdges([
      {
        source: 1,
        target: 2,
        shape: 'tree-edge',
      },
      {
        source: 3,
        target: 2,
        shape: 'tree-edge',
      },
    ])
    graph.on('node:contextmenu', (e) => {
      console.log(e)
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
