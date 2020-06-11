# cortex-router
Declaractive Routing for Cortex

- [cortex](//github.com/ndugger/cortex)
- [pathfinder](//github.com/ndugger/pathfinder)

### Example
```typescript
import * as Cortex from 'cortex'
import * as Router from 'cortex-router'

export class Root extends Cortex.Component {

    public render() {
        return [
            <Router.RouterContext>
                <Router.Route exact path='/'>
                    Viewing Index
                </Router.Route>
                <Router.Route exact path='/things'>
                    Viewing Things
                </Router.Route>
                <Router.Route exact path='/things/{ thing_id }'>
                    Viewing Specific Thing
                </Router.Route>
            </Router.RouterContext>
        ];
    }
}
```