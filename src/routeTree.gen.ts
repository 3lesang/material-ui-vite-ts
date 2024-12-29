/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminImport } from './routes/_admin'
import { Route as AdminIndexImport } from './routes/_admin/index'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as AdminContactImport } from './routes/_admin/contact'
import { Route as AdminAboutImport } from './routes/_admin/about'
import { Route as AdminProductIndexImport } from './routes/_admin/product/index'
import { Route as AdminSettingSettingImport } from './routes/_admin/setting/_setting'
import { Route as AdminProductCreateImport } from './routes/_admin/product/create'
import { Route as AdminProductIdImport } from './routes/_admin/product/$id'
import { Route as AdminSettingSettingIndexImport } from './routes/_admin/setting/_setting/index'
import { Route as AdminSettingSettingUserIndexImport } from './routes/_admin/setting/_setting/user/index'
import { Route as AdminSettingSettingRoleIndexImport } from './routes/_admin/setting/_setting/role/index'
import { Route as AdminSettingSettingUserIdImport } from './routes/_admin/setting/_setting/user/$id'
import { Route as AdminSettingSettingRoleIdImport } from './routes/_admin/setting/_setting/role/$id'

// Create Virtual Routes

const AdminSettingImport = createFileRoute('/_admin/setting')()

// Create/Update Routes

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const AdminSettingRoute = AdminSettingImport.update({
  id: '/setting',
  path: '/setting',
  getParentRoute: () => AdminRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AdminRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const AdminContactRoute = AdminContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAboutRoute = AdminAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => AdminRoute,
} as any)

const AdminProductIndexRoute = AdminProductIndexImport.update({
  id: '/product/',
  path: '/product/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminSettingSettingRoute = AdminSettingSettingImport.update({
  id: '/_setting',
  getParentRoute: () => AdminSettingRoute,
} as any)

const AdminProductCreateRoute = AdminProductCreateImport.update({
  id: '/product/create',
  path: '/product/create',
  getParentRoute: () => AdminRoute,
} as any)

const AdminProductIdRoute = AdminProductIdImport.update({
  id: '/product/$id',
  path: '/product/$id',
  getParentRoute: () => AdminRoute,
} as any)

const AdminSettingSettingIndexRoute = AdminSettingSettingIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AdminSettingSettingRoute,
} as any)

const AdminSettingSettingUserIndexRoute =
  AdminSettingSettingUserIndexImport.update({
    id: '/user/',
    path: '/user/',
    getParentRoute: () => AdminSettingSettingRoute,
  } as any)

const AdminSettingSettingRoleIndexRoute =
  AdminSettingSettingRoleIndexImport.update({
    id: '/role/',
    path: '/role/',
    getParentRoute: () => AdminSettingSettingRoute,
  } as any)

const AdminSettingSettingUserIdRoute = AdminSettingSettingUserIdImport.update({
  id: '/user/$id',
  path: '/user/$id',
  getParentRoute: () => AdminSettingSettingRoute,
} as any)

const AdminSettingSettingRoleIdRoute = AdminSettingSettingRoleIdImport.update({
  id: '/role/$id',
  path: '/role/$id',
  getParentRoute: () => AdminSettingSettingRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      id: '/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_admin/about': {
      id: '/_admin/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AdminAboutImport
      parentRoute: typeof AdminImport
    }
    '/_admin/contact': {
      id: '/_admin/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof AdminContactImport
      parentRoute: typeof AdminImport
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
    '/_admin/': {
      id: '/_admin/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof AdminImport
    }
    '/_admin/product/$id': {
      id: '/_admin/product/$id'
      path: '/product/$id'
      fullPath: '/product/$id'
      preLoaderRoute: typeof AdminProductIdImport
      parentRoute: typeof AdminImport
    }
    '/_admin/product/create': {
      id: '/_admin/product/create'
      path: '/product/create'
      fullPath: '/product/create'
      preLoaderRoute: typeof AdminProductCreateImport
      parentRoute: typeof AdminImport
    }
    '/_admin/setting': {
      id: '/_admin/setting'
      path: '/setting'
      fullPath: '/setting'
      preLoaderRoute: typeof AdminSettingImport
      parentRoute: typeof AdminImport
    }
    '/_admin/setting/_setting': {
      id: '/_admin/setting/_setting'
      path: '/setting'
      fullPath: '/setting'
      preLoaderRoute: typeof AdminSettingSettingImport
      parentRoute: typeof AdminSettingRoute
    }
    '/_admin/product/': {
      id: '/_admin/product/'
      path: '/product'
      fullPath: '/product'
      preLoaderRoute: typeof AdminProductIndexImport
      parentRoute: typeof AdminImport
    }
    '/_admin/setting/_setting/': {
      id: '/_admin/setting/_setting/'
      path: '/'
      fullPath: '/setting/'
      preLoaderRoute: typeof AdminSettingSettingIndexImport
      parentRoute: typeof AdminSettingSettingImport
    }
    '/_admin/setting/_setting/role/$id': {
      id: '/_admin/setting/_setting/role/$id'
      path: '/role/$id'
      fullPath: '/setting/role/$id'
      preLoaderRoute: typeof AdminSettingSettingRoleIdImport
      parentRoute: typeof AdminSettingSettingImport
    }
    '/_admin/setting/_setting/user/$id': {
      id: '/_admin/setting/_setting/user/$id'
      path: '/user/$id'
      fullPath: '/setting/user/$id'
      preLoaderRoute: typeof AdminSettingSettingUserIdImport
      parentRoute: typeof AdminSettingSettingImport
    }
    '/_admin/setting/_setting/role/': {
      id: '/_admin/setting/_setting/role/'
      path: '/role'
      fullPath: '/setting/role'
      preLoaderRoute: typeof AdminSettingSettingRoleIndexImport
      parentRoute: typeof AdminSettingSettingImport
    }
    '/_admin/setting/_setting/user/': {
      id: '/_admin/setting/_setting/user/'
      path: '/user'
      fullPath: '/setting/user'
      preLoaderRoute: typeof AdminSettingSettingUserIndexImport
      parentRoute: typeof AdminSettingSettingImport
    }
  }
}

// Create and export the route tree

interface AdminSettingSettingRouteChildren {
  AdminSettingSettingIndexRoute: typeof AdminSettingSettingIndexRoute
  AdminSettingSettingRoleIdRoute: typeof AdminSettingSettingRoleIdRoute
  AdminSettingSettingUserIdRoute: typeof AdminSettingSettingUserIdRoute
  AdminSettingSettingRoleIndexRoute: typeof AdminSettingSettingRoleIndexRoute
  AdminSettingSettingUserIndexRoute: typeof AdminSettingSettingUserIndexRoute
}

const AdminSettingSettingRouteChildren: AdminSettingSettingRouteChildren = {
  AdminSettingSettingIndexRoute: AdminSettingSettingIndexRoute,
  AdminSettingSettingRoleIdRoute: AdminSettingSettingRoleIdRoute,
  AdminSettingSettingUserIdRoute: AdminSettingSettingUserIdRoute,
  AdminSettingSettingRoleIndexRoute: AdminSettingSettingRoleIndexRoute,
  AdminSettingSettingUserIndexRoute: AdminSettingSettingUserIndexRoute,
}

const AdminSettingSettingRouteWithChildren =
  AdminSettingSettingRoute._addFileChildren(AdminSettingSettingRouteChildren)

interface AdminSettingRouteChildren {
  AdminSettingSettingRoute: typeof AdminSettingSettingRouteWithChildren
}

const AdminSettingRouteChildren: AdminSettingRouteChildren = {
  AdminSettingSettingRoute: AdminSettingSettingRouteWithChildren,
}

const AdminSettingRouteWithChildren = AdminSettingRoute._addFileChildren(
  AdminSettingRouteChildren,
)

interface AdminRouteChildren {
  AdminAboutRoute: typeof AdminAboutRoute
  AdminContactRoute: typeof AdminContactRoute
  AdminIndexRoute: typeof AdminIndexRoute
  AdminProductIdRoute: typeof AdminProductIdRoute
  AdminProductCreateRoute: typeof AdminProductCreateRoute
  AdminSettingRoute: typeof AdminSettingRouteWithChildren
  AdminProductIndexRoute: typeof AdminProductIndexRoute
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminAboutRoute: AdminAboutRoute,
  AdminContactRoute: AdminContactRoute,
  AdminIndexRoute: AdminIndexRoute,
  AdminProductIdRoute: AdminProductIdRoute,
  AdminProductCreateRoute: AdminProductCreateRoute,
  AdminSettingRoute: AdminSettingRouteWithChildren,
  AdminProductIndexRoute: AdminProductIndexRoute,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AdminRouteWithChildren
  '/about': typeof AdminAboutRoute
  '/contact': typeof AdminContactRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/': typeof AdminIndexRoute
  '/product/$id': typeof AdminProductIdRoute
  '/product/create': typeof AdminProductCreateRoute
  '/setting': typeof AdminSettingSettingRouteWithChildren
  '/product': typeof AdminProductIndexRoute
  '/setting/': typeof AdminSettingSettingIndexRoute
  '/setting/role/$id': typeof AdminSettingSettingRoleIdRoute
  '/setting/user/$id': typeof AdminSettingSettingUserIdRoute
  '/setting/role': typeof AdminSettingSettingRoleIndexRoute
  '/setting/user': typeof AdminSettingSettingUserIndexRoute
}

export interface FileRoutesByTo {
  '/about': typeof AdminAboutRoute
  '/contact': typeof AdminContactRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/': typeof AdminIndexRoute
  '/product/$id': typeof AdminProductIdRoute
  '/product/create': typeof AdminProductCreateRoute
  '/setting': typeof AdminSettingSettingIndexRoute
  '/product': typeof AdminProductIndexRoute
  '/setting/role/$id': typeof AdminSettingSettingRoleIdRoute
  '/setting/user/$id': typeof AdminSettingSettingUserIdRoute
  '/setting/role': typeof AdminSettingSettingRoleIndexRoute
  '/setting/user': typeof AdminSettingSettingUserIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_admin': typeof AdminRouteWithChildren
  '/_admin/about': typeof AdminAboutRoute
  '/_admin/contact': typeof AdminContactRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/_admin/': typeof AdminIndexRoute
  '/_admin/product/$id': typeof AdminProductIdRoute
  '/_admin/product/create': typeof AdminProductCreateRoute
  '/_admin/setting': typeof AdminSettingRouteWithChildren
  '/_admin/setting/_setting': typeof AdminSettingSettingRouteWithChildren
  '/_admin/product/': typeof AdminProductIndexRoute
  '/_admin/setting/_setting/': typeof AdminSettingSettingIndexRoute
  '/_admin/setting/_setting/role/$id': typeof AdminSettingSettingRoleIdRoute
  '/_admin/setting/_setting/user/$id': typeof AdminSettingSettingUserIdRoute
  '/_admin/setting/_setting/role/': typeof AdminSettingSettingRoleIndexRoute
  '/_admin/setting/_setting/user/': typeof AdminSettingSettingUserIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/about'
    | '/contact'
    | '/auth/login'
    | '/auth/register'
    | '/'
    | '/product/$id'
    | '/product/create'
    | '/setting'
    | '/product'
    | '/setting/'
    | '/setting/role/$id'
    | '/setting/user/$id'
    | '/setting/role'
    | '/setting/user'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/about'
    | '/contact'
    | '/auth/login'
    | '/auth/register'
    | '/'
    | '/product/$id'
    | '/product/create'
    | '/setting'
    | '/product'
    | '/setting/role/$id'
    | '/setting/user/$id'
    | '/setting/role'
    | '/setting/user'
  id:
    | '__root__'
    | '/_admin'
    | '/_admin/about'
    | '/_admin/contact'
    | '/auth/login'
    | '/auth/register'
    | '/_admin/'
    | '/_admin/product/$id'
    | '/_admin/product/create'
    | '/_admin/setting'
    | '/_admin/setting/_setting'
    | '/_admin/product/'
    | '/_admin/setting/_setting/'
    | '/_admin/setting/_setting/role/$id'
    | '/_admin/setting/_setting/user/$id'
    | '/_admin/setting/_setting/role/'
    | '/_admin/setting/_setting/user/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AdminRoute: typeof AdminRouteWithChildren
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  AdminRoute: AdminRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_admin",
        "/auth/login",
        "/auth/register"
      ]
    },
    "/_admin": {
      "filePath": "_admin.tsx",
      "children": [
        "/_admin/about",
        "/_admin/contact",
        "/_admin/",
        "/_admin/product/$id",
        "/_admin/product/create",
        "/_admin/setting",
        "/_admin/product/"
      ]
    },
    "/_admin/about": {
      "filePath": "_admin/about.tsx",
      "parent": "/_admin"
    },
    "/_admin/contact": {
      "filePath": "_admin/contact.tsx",
      "parent": "/_admin"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    },
    "/_admin/": {
      "filePath": "_admin/index.tsx",
      "parent": "/_admin"
    },
    "/_admin/product/$id": {
      "filePath": "_admin/product/$id.tsx",
      "parent": "/_admin"
    },
    "/_admin/product/create": {
      "filePath": "_admin/product/create.tsx",
      "parent": "/_admin"
    },
    "/_admin/setting": {
      "filePath": "_admin/setting",
      "parent": "/_admin",
      "children": [
        "/_admin/setting/_setting"
      ]
    },
    "/_admin/setting/_setting": {
      "filePath": "_admin/setting/_setting.tsx",
      "parent": "/_admin/setting",
      "children": [
        "/_admin/setting/_setting/",
        "/_admin/setting/_setting/role/$id",
        "/_admin/setting/_setting/user/$id",
        "/_admin/setting/_setting/role/",
        "/_admin/setting/_setting/user/"
      ]
    },
    "/_admin/product/": {
      "filePath": "_admin/product/index.tsx",
      "parent": "/_admin"
    },
    "/_admin/setting/_setting/": {
      "filePath": "_admin/setting/_setting/index.tsx",
      "parent": "/_admin/setting/_setting"
    },
    "/_admin/setting/_setting/role/$id": {
      "filePath": "_admin/setting/_setting/role/$id.tsx",
      "parent": "/_admin/setting/_setting"
    },
    "/_admin/setting/_setting/user/$id": {
      "filePath": "_admin/setting/_setting/user/$id.tsx",
      "parent": "/_admin/setting/_setting"
    },
    "/_admin/setting/_setting/role/": {
      "filePath": "_admin/setting/_setting/role/index.tsx",
      "parent": "/_admin/setting/_setting"
    },
    "/_admin/setting/_setting/user/": {
      "filePath": "_admin/setting/_setting/user/index.tsx",
      "parent": "/_admin/setting/_setting"
    }
  }
}
ROUTE_MANIFEST_END */
