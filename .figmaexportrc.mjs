const output = './src/assets';

import asSvgstore from '@figma-export/output-components-as-svgstore';
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo'
import asSvg from '@figma-export/output-components-as-svg';

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
              params: {
                overrides: {
                  removeViewBox: false,
                }
              }
            },
            {
              name: 'removeDimensions'
            }
          ]
        })
      ],
      outputters: [
        asSvg({
          output,
          getDirname: () => 'icons',
        }),
        asSvgstore({
          output: './src/assets/sprites',
        })
      ]
    }],
  ]
}
