import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"

import React from "react"
import { Avatar } from "@mui/material"

type Testimonial = {
	userId: string
	timestamp: string
	messageContent: {
		json: Document
	}
	userAvatar: string
	userName: string
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
	return (
		<div className="z-10 bg-[#212325] px-2 py-2 md:px-8 md:py-4 rounded-lg w-full flex gap-2 md:gap-4 overflow-hidden">
			<Avatar
				alt={`${testimonial.userName} Avatar Image`}
				src={testimonial.userAvatar}
			/>
			<div className="flex flex-col gap-2">
				<span className="font-bold text-[#FFBB00]">{testimonial.userName}</span>
				<div className="leading-relaxed">
					{documentToReactComponents(testimonial.messageContent.json, {
						renderText: () => {
							const plainText = documentToPlainTextString(
								testimonial.messageContent.json
							)
							const truncatedText = truncateText(plainText, 640)

							return truncatedText
						},
					})}
				</div>
			</div>
		</div>
	)
}

export default TestimonialCard

const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) {
		return text
	}
	return `${text.substring(0, maxLength)}...`
}
