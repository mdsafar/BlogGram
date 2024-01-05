import mongoose from "mongoose";
import _ from 'lodash'

const blogSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
        maxLength:50
    },
    content:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comments:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            text:{
                type:String,
                required:true
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            likes:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }
            ],
            timestamp: Date,
            subComments:[
                {
                    userId:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'User'
                    },
                    text:{
                        type:String,
                        required:true
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                    likes:[
                        {
                            type:mongoose.Schema.Types.ObjectId,
                            ref:"User"
                        }
                    ],
                    timestamp:Date 
                }
            ]
        }
    ]
    
})
blogSchema.pre('save', async function (next){
    if(!this.isModified('title')){
     return next()
    }
    this.title = _.capitalize(this.title);
    next()
})

const Blog = mongoose.model('Blog',blogSchema)

export default Blog