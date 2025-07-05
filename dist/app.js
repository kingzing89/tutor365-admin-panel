import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import componentLoader from './admin/component-loader.js';
import provider from './admin/auth-provider.js';
import initializeDb from './db/index.js';
import { User } from "./schemas/user.schema.js";
import * as AdminJSMongoose from '@adminjs/mongoose';
const port = process.env.PORT || 3000;
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
});
const start = async () => {
    const app = express();
    await initializeDb();
    AdminJS.registerAdapter({ Resource: AdminJSMongoose.Resource, Database: AdminJSMongoose.Database });
    const admin = new AdminJS({
        componentLoader,
        rootPath: '/admin',
        resources: [
            {
                resource: User,
                options: {
                    navigation: {
                        name: 'User Management',
                        icon: 'User',
                    },
                    properties: {
                        _id: {
                            isVisible: {
                                edit: false,
                                show: false,
                                list: false,
                                filter: false,
                            },
                        },
                        isDeleted: {
                            isVisible: {
                                show: true,
                                list: true,
                            },
                        },
                        createdAt: {
                            isVisible: {
                                show: true,
                                list: true,
                            },
                        },
                        updatedAt: {
                            isVisible: {
                                show: true,
                                list: true,
                            },
                        },
                        email: { isVisible: true },
                        displayName: { isVisible: true },
                        password: {
                            isVisible: {
                                edit: true,
                            },
                        },
                        role: { isVisible: false },
                        organization_id: {
                            isVisible: {
                                list: true,
                                show: true,
                                edit: true,
                                filter: true,
                            },
                        },
                    },
                },
            },
        ],
    });
    if (process.env.NODE_ENV === 'production') {
        await admin.initialize();
    }
    else {
        admin.watch();
    }
    const router = buildAuthenticatedRouter(admin, {
        cookiePassword: process.env.COOKIE_SECRET,
        cookieName: 'adminjs',
        provider,
    }, null, {
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: true,
        resave: true,
    });
    app.use(admin.options.rootPath, router);
    app.listen(port, () => {
        console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
    });
};
start();
