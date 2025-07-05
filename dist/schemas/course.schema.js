import { model, Schema } from 'mongoose';
const VideoSchema = new Schema({
    title: { type: 'String', required: true },
    url: { type: 'String', required: true }
});
const ChapterSchema = new Schema({
    title: { type: 'String', required: true },
    order: { type: 'Number', required: true },
    videos: [VideoSchema]
});
export const CourseSchema = new Schema({
    title: {
        type: 'String',
        required: [true, 'Please provide a course title'],
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: 'String',
        required: [true, 'Please provide a course description']
    },
    image: {
        type: 'String',
        default: '/images/default-course.png'
    },
    duration: {
        type: 'String',
        required: [true, 'Please provide course duration']
    },
    level: {
        type: 'String',
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Intermediate'
    },
    bgColor: {
        type: 'String',
        default: 'from-blue-500 to-purple-500'
    },
    
    instructor: {
        name: {
            type: 'String',
            required: [true, 'Please provide instructor name']
        }
    },
    chapters: [ChapterSchema],
    isPublished: {
        type: 'Boolean',
        default: false
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
export const Course = model('Course', CourseSchema);
