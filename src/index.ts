import * as Cortex from 'cortex';
import * as Pathfinder from 'pathfinder';

/**
 * Interface provided to manage application navigation
 */
interface Router {
    matches(route: Route): boolean
    navigate(path: string): Promise<void>
    register(path: string, route: Route): void
}

/**
 * Context which provides a declarative way to register application routes
 */
export class RouterContext extends Cortex.Context<Router> {
    
    /**
     * Each router context gets its own instance of pathfinder's router
     * I have yet to determine if this is good or bad yet
     */
    private router = new Pathfinder.Router();

    /**
     * Currently active route
     */
    private route: Route;

    /**
     * Implementation of interface provided to manage application navigation
     */
    public value: Router = {

        /**
         * Detect if a route matches the currently active route
         */
        matches: (route: Route) => {
            return route === this.route;
        },

        /**
         * Navigate application to new path
         */
        navigate: (path: string, state: object = {}) => {
            window.history.pushState(state, document.title, path);

            return new Promise((resolve, reject) => {
                const route = this.router.find(Pathfinder.RouterMethod.GET, path);

                if (route) {
                    route.resolve(component => {
                        this.update({ route: component });
                        resolve(component);
                    });
                }

                reject(new Error(`No route exists for ${ path }`));
            });
        },

        /**
         * Register a path and a Route component
         */
        register: (path: string, route: Route) => {
            this.router.get(path, () => Promise.resolve(route));
        }
    };
}

/**
 * Component used to register a route with a path
 */
export class Route extends Cortex.Component {

    public path?: string;
    
    protected handleComponentReady() {
        this.getContext(RouterContext).register(this.path, this);
    }

    public render() {
        const router = this.getContext(RouterContext);

        if (!router.matches(this)) {
            return [];
        }

        return [ 
            Cortex.createElement(HTMLSlotElement)
        ];
    }

    public theme() {
        return `
            :host {
                display: contents;
            }
        `;
    }
}
