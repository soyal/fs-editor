import React from 'react';

import { storiesOf } from '@storybook/react'
import Demo from './demo'
import Demo2 from './convert-from-html'
import DataConvert from './data-convert'

storiesOf('FsEditor', module)
  .add('basic', () => <Demo></Demo>)
  .add('convert from html', () => <Demo2></Demo2>)
  .add('data convert', () => <DataConvert></DataConvert>)