# cortex-router
Declaractive Routing for Cortex

- [cortex](//github.com/ndugger/cortex)
- [pathfinder](//github.com/ndugger/pathfinder)

### Example
```typescript
import { Component, createElement } from 'cortex'
import { Route, RouterContext } from 'cortex-router'

export class Root extends Component {

    public render() {
        return [
            <RouterContext>
                <Route path='/'>
                    Viewing Index
                </Route>
                <Route path='/things'>
                    Viewing Things
                </Route>
                <Route path='/things/{ thing_id }'>
                    Viewing Specific Thing
                </Route>
            </RouterContext>
        ]
    }
}
```
