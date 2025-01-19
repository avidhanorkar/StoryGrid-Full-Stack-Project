import React from 'react'

const CommentBody = ({commenter, cmntBody}) => {
  return (
    <div>
        <div className="name border-b-2 p-4 flex justify-between text-base">
            <p className='text-[18px] font-[500] text-gray-700'>{commenter}</p>
            <p className='text-[15px] font-[450] text-gray-500'>{cmntBody}</p>
        </div>
    </div>
  )
}

export default CommentBody