const output = './src/assets';

import outputComponentsAsSvg from '@figma-export/output-components-as-svg';
import asSvgstore from '@figma-export/output-components-as-svgstore';
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo'

export default {
  commands: [
    ['components', {
      fileId: 'aflHxPf4SzJXP6N2UhxXdz',
      onlyFromPages: ['icons'],
      transformers: [

        transformSvgWithSvgo({
          plugins: [
            {
              name: 'preset-default',
            },
            {
              name: "removeAttrs",
              params: {
                attrs: '(fill)'
              }
            },
            {
              name: 'removeDimensions'
            }
          ]
        })
      ],
      outputters: [
        outputComponentsAsSvg({
          output
        }),
        asSvgstore({
          output: './src/assets/sprites',
          getIconId: (options) => `${options.componentName}`
        })
      ]
    }],
  ]
}
