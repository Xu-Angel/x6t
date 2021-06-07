<template>
  <div class="hello">
    <div ref="cr" id="cr"></div>
  </div>
</template>

<script>
import { Graph, Node, Edge, Shape } from '@antv/x6'
import { data } from './mindmap.js'
export default {
  name: 'Tree',
  mounted() {
    class TreeNode extends Node {
      collapsed = false
      postprocess() {
        this.toggleCollapse(false)
      }

      isCollapsed() {
        return this.collapsed
      }

      toggleButtonVisibility(visible) {
        this.attr('buttonGroup', {
          display: visible ? 'block' : 'none',
        })
      }

      toggleCollapse(collapsed) {
        const target = collapsed == null ? !this.collapsed : collapsed
        if (!target) {
          this.attr('buttonSign', {
            d: 'M 1 5 9 5 M 5 1 5 9',
            strokeWidth: 1.6,
          })
        } else {
          this.attr('buttonSign', {
            d: 'M 2 5 8 5',
            strokeWidth: 1.8,
          })
        }
        this.collapsed = target
      }
    }
    TreeNode.config({
      zIndex: 2,
      markup: [
        {
          tagName: 'g',
          selector: 'buttonGroup',
          children: [
            {
              tagName: 'rect',
              selector: 'button',
              attrs: {
                'pointer-events': 'visiblePainted',
              },
            },

            {
              tagName: 'path',
              selector: 'buttonSign',
              attrs: {
                fill: 'none',
                'pointer-events': 'none',
              },
            },
          ],
        },

        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          refWidth: '100%',
          refHeight: '100%',
          strokeWidth: 1,
          fill: '#ffffff',
          stroke: '#a0a0a0',
        },
        label: {
          textWrap: {
            ellipsis: true,
            width: -10,
          },
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          refX: '50%',
          refY: '50%',
          fontSize: 12,
        },
        buttonGroup: {
          refX: '100%',
          refY: '50%',
        },
        button: {
          fill: '#4C65DD',
          stroke: 'none',
          x: -10,
          y: -10,
          height: 20,
          width: 30,
          rx: 10,
          ry: 10,
          cursor: 'pointer',
          event: 'node:collapse',
        },
        buttonSign: {
          refX: 5,
          refY: -5,
          stroke: '#FFFFFF',
          strokeWidth: 1.6,
        },
      },
    })
    // 定义边
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
    Node.registry.register('tree-node', TreeNode, true)
    Edge.registry.register('tree-edge', TreeEdge, true)
    // 初始化画布
    const graph = new Graph({
      container: document.getElementById('cr'),
      grid: true,
      async: true,
      frozen: false,
      scroller: true,
      interacting: false,
      sorting: 'approx',
      snapline: true,
      height: '100vh',
      background: true,
      connecting: {
        anchor: 'orth',
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'er',
          args: {
            offset: 24,
            direction: 'H',
          },
        },
      },
    })

    graph.on('node:collapse', ({ node }) => {
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const run = (pre) => {
        const succ = graph.getSuccessors(pre, { distance: 1 })
        if (succ) {
          succ.forEach((node) => {
            node.toggleVisible(!collapsed)
            if (!node.isCollapsed()) {
              run(node)
            }
          })
        }
      }
      run(node)
    })
    const start = new Date().getTime()
    const nodes = data.nodes.map(({ leaf, ...metadata }) => {
      const node = new TreeNode(metadata)
      if (leaf) {
        node.toggleButtonVisibility(leaf === false)
      }
      return node
    })
    const edges = data.edges.map(
      (edge) =>
        new TreeEdge({
          source: edge.source,
          target: edge.target,
        })
    )
    console.log([...nodes, ...edges])
    // graph.fromJSON(data)
    graph.resetCells([...nodes, ...edges])

    graph.unfreeze({
      progress({ done }) {
        if (done) {
          const time = new Date().getTime() - start
          console.log(time)
          graph.unfreeze({
            batchSize: 50,
          })
          graph.zoomToFit({ padding: 24 })
        }
      },
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
