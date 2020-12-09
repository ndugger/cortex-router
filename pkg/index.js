import { Component, Context, createElement } from 'cortex';
import { Router as Pathfinder, RouterMethod } from 'pathfinder';
/**
 * Context which provides a declarative way to register application routes
 */
export class RouterContext extends Context {
    constructor() {
        super(...arguments);
        /**
         * Each router context gets its own instance of pathfinder's router
         */
        this.router = new Pathfinder();
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
                    const route = this.router.find(RouterMethod.GET, path);
                    if (route) {
                        const prevRoute = this.route;
                        route.resolve((nextRoute) => {
                            this.update({ route: nextRoute }).then(() => {
                                prevRoute.update();
                                nextRoute.update();
                                resolve();
                            });
                        });
                    }
                    reject(new Error(`No route exists for ${path}`));
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
export class Route extends Component {
    handleComponentReady() {
        this.getContext(RouterContext).register(this.path, this);
    }
    render() {
        const router = this.getContext(RouterContext);
        if (!router.matches(this)) {
            return [];
        }
        return [
            createElement(HTMLSlotElement)
        ];
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