import * as Cortex from 'cortex';
import * as Pathfinder from 'pathfinder';
/**
 * Context which provides a declarative way to register application routes
 */
export class RouterContext extends Cortex.Context {
    constructor() {
        super(...arguments);
        /**
         * Each router context gets its own instance of pathfinder's router
         * I have yet to determine if this is good or bad yet
         */
        this.router = new Pathfinder.Router();
        /**
         * Implementation of interface provided to manage application navigation
         */
        this.value = {
            /**
             * Detect if a route matches the currently active route
             */
            matches: (route) => {
                return route === this.route;
            },
            /**
             * Navigate application to new path
             */
            navigate: (path, state = {}) => {
                window.history.pushState(state, document.title, path);
                return new Promise((resolve, reject) => {
                    const route = this.router.find(Pathfinder.RouterMethod.GET, path);
                    if (route) {
                        route.resolve(component => {
                            this.update({ route: component });
                            resolve(component);
                        });
                    }
                    reject(new Cortex.Context.RuntimeError(`No route exists for ${path}`));
                });
            },
            /**
             * Register a path and a Route component
             */
            register: (path, route) => {
                this.router.get(path, () => Promise.resolve(route));
            }
        };
    }
}
/**
 * Component used to register a route with a path
 */
export class Route extends Cortex.Component {
    handleComponentReady() {
        this.getContext(RouterContext).register(this.path, this);
    }
    render() {
        const router = this.getContext(RouterContext);
        if (!router.matches(this)) {
            return [];
        }
        return [Cortex.render(HTMLSlotElement)];
    }
    theme() {
        return `
            :host {
                display: contents;
            }
        `;
    }
}
//# sourceMappingURL=index.js.map