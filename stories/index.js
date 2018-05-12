import React from 'react'

import { storiesOf } from '@storybook/react'
import Demo from './demo'
import Demo2 from './convert-from-html'
import DataConvert from './data-convert'
import IsEmpty from './is-empty'
import ImagePlugin from './image-plugin'

storiesOf('FsEditor', module)
  .add('basic', () => <Demo />)
  .add('convert from html', () => <Demo2 />)
  .add('data convert', () => <DataConvert />)
  .add('验证是否为空', () => <IsEmpty />)

storiesOf('Plugin', module).add('Image Plugin', () => <ImagePlugin />)
