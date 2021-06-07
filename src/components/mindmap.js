export const data = {
  nodes: [
    {
      id: 69,
      shape: 'tree-node',
      width: 70,
      height: 26,
      leaf: false,
      attrs: {
        label: {
          textWrap: {
            text: 'FlinkSQL',
          },
        },
        body: {
          fill: 'red',
        },
        button: {
          fill: '#f1f2f7',
          stroke: 'none',
        },
      },
    },
    {
      id: 70,
      shape: 'tree-node',
      width: 70,
      height: 26,
      leaf: false,
      attrs: {
        label: {
          textWrap: {
            text: '分流',
          },
        },
      },
      x: 184,
      y: 20,
    },
    {
      id: 71,
      shape: 'tree-node',
      width: 70,
      height: 26,
      leaf: false,
      attrs: {
        label: {
          textWrap: {
            text: '合流',
          },
        },
      },
      x: 333,
      y: 13,
    },
    {
      id: 72,
      shape: 'tree-node',
      width: 70,
      height: 26,
      leaf: true,
      attrs: {
        label: {
          textWrap: {
            text: 'FlinkSQL',
          },
        },
      },
      x: 503,
      y: 13,
    },
    {
      id: 73,
      shape: 'tree-node',
      width: 70,
      height: 26,
      leaf: false,
      attrs: {
        label: {
          textWrap: {
            text: '分流',
          },
        },
      },
      x: 333,
      y: 69,
    },
    {
      id: 74,
      shape: 'tree-node',
      width: 70,
      height: 26,
      leaf: true,
      attrs: {
        label: {
          textWrap: {
            text: 'FlinkSQL',
          },
        },
      },
      x: 503,
      y: 69,
    },
  ],
  edges: [
    {
      source: 69,
      target: 70,
      shape: 'tree-edge',
    },
    {
      source: 70,
      target: 71,
      shape: 'tree-edge',
    },
    {
      source: 71,
      target: 72,
      shape: 'tree-edge',
    },
    {
      source: 70,
      target: 73,
      shape: 'tree-edge',
    },
    {
      source: 73,
      target: 74,
      shape: 'tree-edge',
    },
  ],
}
