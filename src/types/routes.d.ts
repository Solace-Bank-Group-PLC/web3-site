type DynamicSegment = string | number;

type RouteParams = Record<string, DynamicSegment>;

interface RouteConfig {
  path: string;
  dynamic?: boolean;
  params?: RouteParams;
}

type Routes = {
  home: RouteConfig;
  about: RouteConfig;
  blog: {
    index: RouteConfig;
    post: RouteConfig & {
      params: {
        slug: string;
      };
    };
  };
  // Add more routes as needed
};

declare module 'next/router' {
  interface TypedRouter extends NextRouter {
    push<T extends keyof Routes>(
      route: T,
      params?: Routes[T]['params']
    ): Promise<boolean>;
    
    replace<T extends keyof Routes>(
      route: T,
      params?: Routes[T]['params']
    ): Promise<boolean>;
  }
} 