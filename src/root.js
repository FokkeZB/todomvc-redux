/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AppView from './views/AppView'
import TodoReducer from './data/TodoReducer'

const store = createStore(TodoReducer)

ReactDOM.render(
  <Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById('todoapp')
)