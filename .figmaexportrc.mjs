const output = './src/assets';

import asSvgstore from '@figma-export/output-components-as-svgstore'
import asSvg from '@figma-export/output-components-as-svg'

export default {
  commands: [
    ['components', {
      fileId: 'aflHxPf4SzJXP6N2UhxXdz',
      onlyFromPages: ['icons'],
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
