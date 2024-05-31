import React from 'react'
import { Link } from 'react-router-dom'
import { images, stables } from "../../../constants";

const SuggestedPosts = ({className,header,posts=[],tags}) => {
  return (
    <div className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}>
        <h2 className='font-roboto font-medium text-dark-hard md:text-xl font-sans'>{header}</h2>
        <div className='grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1'>
            {posts.map((item)=>(
                <div key={item._id} className='flex space-x-3 flex-nowrap items-center'>
                    <img className='aspect-square object-cover rounded-lg w-1/5 ' 
                    src={
                  item?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + item?.photo
                  : images.samplePostImage
                    }
                     alt={item.title} />
                    <div className='text-sm font-roboto text-dark-hard font-medium '>
                        <h3 className='text-sm font-roboto text-dark-hard md:text-base lg:text-lg pr-2'> <Link to={`/blog/${item.slug}`}>{item.title}</Link></h3>
                        <span className='text-xs opacity-60 pr-2'>
                            {new Date(item.createdAt).toLocaleDateString("en-US",{
                                day:'numeric',
                                month: "short",
                                year:"numeric"
                            })}
                        </span>
                    </div>
                </div>
            ))}
        </div>


    </div>
  )
}

export default SuggestedPosts