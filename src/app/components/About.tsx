"use client";

import Image from "next/image";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const About = () => {
	const slides = [
		"/assets/user_images/1.jpg",
		"/assets/user_images/2.jpg",
		"/assets/user_images/3.jpg",
		"/assets/user_images/4.jpg",
	];

	return (
		<div className="z-10 text-white flex flex-col-reverse md:flex-row gap-2 my-8 items-center relative">
			<div className="md:w-[50%]">
				<div className="flex flex-col gap-2">
					<h1 className="text-[#FFBB00] font-bold text-2xl">About Us</h1>
					<div className="flex flex-col gap-2">
						<p>
							We are a group of enthusiasts who know the frustration of watching a
							restock sell out in seconds. We started as a small friend-run alert
							service, but quickly grew into a full-fledged Discord community where
							anyone can get reliable, real-time stock updates completely free of
							charge.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-bold text-[#FFBB00]">Our Mission</span>
						<p>
							To level the playing field for everday shoppers. We believe that everyone
							should have an equal chance of getting what they want for MSRP.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-bold text-[#FFBB00]">What We Do</span>
						<ul className="mx-8">
							<li className="list-disc">
								Monitor multiple retailers and trusted sources around the clock.
							</li>
							<li className="list-disc">
								Send instant Discord notifications the moment new stock appears.
							</li>
							<li className="list-disc">
								Provide clear instructions and direct links so you can check out fast.
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="min-w-0 w-[100%] md:w-[50%] items-center justify-center">
				<Swiper
					modules={[Autoplay, Pagination]}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					pagination={{ clickable: true }}
					loop
					slidesPerView={1}
					autoHeight
					style={{ height: "auto", width: "100%" }}
					className="rounded-2xl overflow-hidden"
				>
					{slides.map((src, i) => (
						<SwiperSlide key={i}>
							<div className="relative w-full aspect-[16/9]">
								<Image
									src={src}
									alt=""
									fill
									sizes="(min-width: 768px) 50vw, 100vw"
									className="object-cover"
									priority={i === 0}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default About;
