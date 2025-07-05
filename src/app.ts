import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import componentLoader from './admin/component-loader.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import { User } from './schemas/user.schema.js';
// import { Course } from './schemas/course.schema.js';
import Course from './schemas/course.schema.js';
import * as AdminJSMongoose from '@adminjs/mongoose';
import Chapter from './schemas/chapter.schema.js';
import { SubscriptionPlan } from './schemas/subscription-plan.schema.js';
import Video from './schemas/video.schema.js';
import uploadFeature, { AWSOptions } from '@adminjs/upload';
import UserSubscription from './schemas/user-subscription.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const AWScredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET,
};

const start = async () => {
  const app = express();

  await initializeDb();

  AdminJS.registerAdapter({ Resource: AdminJSMongoose.Resource, Database: AdminJSMongoose.Database });

  const admin = new AdminJS({
    componentLoader,
    // assets: {
    //     styles: ['/sidebar.css', '/tablecss.css', '/listtables.css'],
    // },
    rootPath: '/admin',
    resources: [
      {
        resource: Video,
        options: {
          navigation: { name: 'Course Management', icon: 'Video' },
          //  listProperties: [
          //           'avatar_url',
          //           'display_name',
          //           'email',
          //           'country',
          //           'onBoardingCompleted',
          //           'percent',
          //           'last_login',
          //           'last_active',
          //       ],
          editProperties: ['title', 'uploadFile'],
          // filterProperties: [
          //     'display_name',
          //     'email',
          //     'country',
          //     'onBoardingCompleted',
          //     'is_deleted',
          //     // 'is_email_confirmed',
          //     'organization_id',
          // ],
          properties: {
            url: {
              isVisible: {
                edit: false,
              },
            },

            updated_at: {
              isVisible: {
                filter: false,
                show: true,
                edit: false,
              },
            },

            created_at: {
              isVisible: {
                filter: false,
                show: true,
                edit: false,
              },
            },
          },
        },
        features: [
          uploadFeature({
            componentLoader,
            provider: {
                    aws: AWScredentials
                    // local: localProvider,
                },
            properties: {
              key: 'url',
              filePath:'/videos',
              file: 'uploadFile',
            },
            uploadPath: (record, filename) => `videos/${Date.now()}-${filename}`,
          }),
        ],
      },
      {
        resource: Chapter,
        options: {
          editProperties: ['title', 'order', 'videos'],
          properties: {
            title: { isTitle: true },
            updated_at: {
              isVisible: {
                filter: false,
                show: true,
                edit: false,
              },
            },

            created_at: {
              isVisible: {
                filter: false,
                show: true,
                edit: false,
              },
            },
            videos: {
              reference: 'Video',
              isArray: true,
            },
          },
        },
      },
      {
        resource: Course,

        features: [
          uploadFeature({
            componentLoader,
             provider: {
                    aws: AWScredentials
                    // local: localProvider,
                },
            properties: {
              key: 'image',
              filePath:'/images',
              file: 'uploadImage',
            },
            uploadPath: (record, filename) => `images/${Date.now()}-${filename}`,
          }),

          // uploadFeature({
          //   componentLoader,
          //   provider: {
          //     local: {
          //       bucket: path.join(__dirname, '../public/uploads/courses/icons'),
          //       opts: {
          //         baseUrl: '/public',
          //       },
          //     },
          //   },
          //   multiple: false,
          //   properties: {
          //     key: 'icon',
          //     file: 'uploadIcon',
          //     filePath: 'iconFilePath', // Add this
          //     filesToDelete: 'iconFilesToDelete', // Add this
          //   },
          //   uploadPath: (record, filename) => `icons/${Date.now()}-icon-${filename}`,
          // }),
        ],

        options: {
          editProperties: ['title', 'description', 'uploadImage', 'instructor','category' ,'chapters', 'duration', 'level'],
          properties: {
            title: { isTitle: true },
            // chapters: {
            //   reference: 'Chapter',
            //   isArray: true,
            // },
            // instructor: {
            //   type: 'mixed',
            //   custom: {
            //     component: false,
            //   },
            // },
            // uploadImage: {
            //   components: {
            //     edit: true,
            //   },
            //   isVisible: { edit: true, list: false, filter: false, show: false },
            // },

            image: {
              isVisible: { edit: false, list: true, show: true },
            },
          },
        },
      },
      {
        resource: User,
        options: {
          editProperties: ['email', 'name', 'password'],
          properties: {
            name: { isTitle: true },
            email: {
              isVisible: {
                edit: true,
                show: false,
              },
            },
            password: {
              isVisible: {
                edit: true,
                show: false,
              },
            },
          },
        },
      },
      {
        resource: SubscriptionPlan,
        options: {
          listProperties: ['title', 'price', 'isPopular', 'buttonText'],
          editProperties: ['title', 'price', 'interval', 'isPopular', 'buttonText'], // remove features here
          showProperties: ['title', 'price', 'interval', 'isPopular', 'buttonText', 'createdAt'],
          properties: {
           
            createdAt: {
              isVisible: { list: true, show: true, edit: false },
            },
            updatedAt: {
              isVisible: { list: true, show: true, edit: false },
            },
          },
        },
      },

      // {
      //   resource: UserSubscription,
      //   options: {
      //     navigation: { name: 'Subscription Management', icon: 'CreditCard' },
      //     listProperties: ['userId', 'subscriptionPlanId', 'status', 'startDate', 'endDate', 'createdAt'],
      //     editProperties: ['userId', 'subscriptionPlanId', 'endDate'],
      //     showProperties: [
      //       'userId',
      //       'subscriptionPlanId',
      //       'status',
      //       'startDate',
      //       'endDate',
      //       'paymentMethod',
      //       'transactionId',
      //       'createdAt',
      //       'updatedAt',
      //     ],
      //     filterProperties: ['status', 'userId', 'subscriptionPlanId', 'startDate', 'endDate'],
      //     properties: {
      //       userId: {
      //         reference: 'User',
      //         isTitle: false,
      //       },
      //       subscriptionPlanId: {
      //         reference: 'SubscriptionPlan',
      //         isTitle: true,
      //       },
      //       status: {
      //         availableValues: [
      //           { value: 'active', label: 'Active' },
      //           { value: 'expired', label: 'Expired' },
      //         ],
      //         isVisible: {
      //           edit: false, // Status is automatically managed
      //           filter: true,
      //           show: true,
      //           list: true,
      //         },
      //       },
      //       startDate: {
      //         isVisible: {
      //           edit: false,
      //           filter: true,
      //           show: true,
      //           list: true,
      //         },
      //       },
      //       endDate: {
      //         isVisible: {
      //           edit: true, // Allow extending subscription
      //           filter: true,
      //           show: true,
      //           list: true,
      //         },
      //       },
      //       paymentMethod: {
      //         isVisible: {
      //           edit: false,
      //           filter: true,
      //           show: true,
      //           list: false,
      //         },
      //         availableValues: [
      //           { value: 'credit_card', label: 'Credit Card' },
      //           { value: 'paypal', label: 'PayPal' },
      //           { value: 'bank_transfer', label: 'Bank Transfer' },
      //         ],
      //       },
      //       transactionId: {
      //         isVisible: {
      //           edit: false,
      //           filter: false,
      //           show: true,
      //           list: false,
      //         },
      //       },
      //       createdAt: {
      //         isVisible: {
      //           edit: false,
      //           filter: true,
      //           show: true,
      //           list: true,
      //         },
      //       },
      //       updatedAt: {
      //         isVisible: {
      //           edit: false,
      //           filter: false,
      //           show: true,
      //           list: false,
      //         },
      //       },
      //     },
      //   },
      // },
    ],
  });

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  app.use(admin.options.rootPath, router);

  // app.use('/uploads', express.static('public/uploads'));

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
