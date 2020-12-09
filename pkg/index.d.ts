import { Component, Context } from 'cortex';
/**
 * Interface provided to manage application navigation
 */
interface Router {
    matches(route: Route): boolean;
    navigate(path: string): Promise<void>;
    register(path: string, route: Route): void;
}
/**
 * Context which provides a declarative way to register application routes
 */
export declare class RouterContext extends Context<Router> {
    /**
     * Each router context gets its own instance of pathfinder's router
     */
    private router;
    /**
     * Currently active route
     */
    private route;
    /**
     * Implementation of interface provided to manage application navigation
     */
    value: Router;
}
/**
 * Component used to register a route with a path
 */
export declare class Route extends Component {
    path?: string;
    protected handleComponentReady(): void;
    render(): import("cortex").Element<HTMLSlotElement>[];
    theme(): string;
}
export {};
