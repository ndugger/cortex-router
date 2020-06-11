import * as Cortex from 'cortex';
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
export declare class RouterContext extends Cortex.Context<Router> {
    /**
     * Each router context gets its own instance of pathfinder's router
     * I have yet to determine if this is good or bad yet
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
export declare class Route extends Cortex.Component {
    exact?: boolean;
    path?: string;
    protected handleComponentReady(): void;
    render(): Cortex.Element<HTMLSlotElement>[];
    theme(): string;
}
export {};
