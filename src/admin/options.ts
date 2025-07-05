import { AdminJSOptions } from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';

// Import your schemas

import { User } from '../schemas/user.schema.js';
import { SubscriptionPlan } from '../schemas/subscription-plan.schema.js';
import { Course } from '../schemas/course.schema.js';

import componentLoader from './component-loader.js';

// Register the mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        navigation: {
          name: 'User Management',
          icon: 'Users',
        },
        listProperties: ['name', 'email', 'createdAt'],
        filterProperties: ['name', 'email'],
        showProperties: ['name', 'email', 'createdAt', 'updatedAt'],
        editProperties: ['name', 'email'],
        properties: {
          name: { 
            isTitle: true,
            description: 'User full name',
          },
          email: {
            description: 'User email address',
          },
          password: {
            type: 'password',
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              new: false,
            },
            description: 'User password (hidden for security)',
          },
          createdAt: {
            isVisible: { edit: false, new: false },
          },
          updatedAt: {
            isVisible: { edit: false, new: false },
          },
        },
        actions: {
          new: {
            isVisible: false, // Disable creating users from admin for security
          },
          delete: {
            guard: 'Are you sure you want to delete this user?',
          },
        },
      },
    },
    {
      resource: SubscriptionPlan,
      options: {
        navigation: {
          name: 'Business',
          icon: 'CreditCard',
        },
        listProperties: ['title', 'price', 'priceDescription', 'isPopular'],
        filterProperties: ['title', 'isPopular'],
        showProperties: ['title', 'price', 'priceDescription', 'features', 'isPopular', 'buttonText', 'createdAt', 'updatedAt'],
        editProperties: ['title', 'price', 'priceDescription', 'features', 'isPopular', 'buttonText'],
        properties: {
          title: { 
            isTitle: true,
            description: 'Subscription plan name',
          },
          price: {
            type: 'number',
            description: 'Plan price',
          },
          priceDescription: {
            description: 'Price description (e.g., "per month")',
          },
          features: {
            type: 'mixed',
            description: 'List of plan features',
          },
          isPopular: {
            description: 'Mark as popular/recommended plan',
          },
          buttonText: {
            description: 'Text for subscription button',
          },
          createdAt: {
            isVisible: { edit: false, new: false },
          },
          updatedAt: {
            isVisible: { edit: false, new: false },
          },
        },
      },
    },
    {
      resource: Course,
      options: {
        navigation: {
          name: 'Content',
          icon: 'Book',
        },
        listProperties: ['title', 'instructor.name', 'level', 'duration', 'isPublished', 'createdAt'],
        filterProperties: ['title', 'level', 'isPublished', 'instructor.name'],
        showProperties: [
          'title',
          'description',
          'image',
          'duration',
          'level',
          'bgColor',
          'icon',
          'instructor.name',
          'chapters',
          'isPublished',
          'createdAt',
          'updatedAt'
        ],
        editProperties: [
          'title',
          'description',
          'image',
          'duration',
          'level',
          'bgColor',
          'icon',
          'instructor.name',
          'chapters',
          'isPublished'
        ],
        properties: {
          title: { 
            isTitle: true,
            description: 'Course title (max 100 characters)',
          },
          description: {
            type: 'textarea',
            description: 'Detailed course description',
          },
          image: {
            description: 'Course thumbnail image URL',
          },
          level: {
            availableValues: [
              { value: 'Beginner', label: 'Beginner' },
              { value: 'Intermediate', label: 'Intermediate' },
              { value: 'Advanced', label: 'Advanced' },
            ],
          },
          bgColor: {
            description: 'Tailwind CSS gradient (e.g., from-blue-500 to-purple-500)',
          },
          icon: {
            description: 'Icon name for the course',
          },
          'instructor.name': {
            description: 'Course instructor name',
          },
          chapters: {
            type: 'mixed',
            description: 'Course chapters with videos',
          },
          isPublished: {
            description: 'Is course published and visible to users',
          },
          createdAt: {
            isVisible: { edit: false, new: false },
          },
          updatedAt: {
            isVisible: { edit: false, new: false },
          },
        },
        actions: {
          edit: {
            before: async (request) => {
              // Auto-update the updatedAt field when editing
              if (request.payload) {
                request.payload.updatedAt = new Date();
              }
              return request;
            },
          },
        },
      },
    },
  ],
  databases: [],
  branding: {
    companyName: 'Learning Platform Admin',
    logo: false,
    withMadeWithLove: false,
    theme: {
      colors: {
        primary100: '#3b82f6',
        primary80: '#60a5fa',
        primary60: '#93c5fd',
        primary40: '#c3ddfd',
        primary20: '#e0f2fe',
      },
    },
  },
};

export default options;