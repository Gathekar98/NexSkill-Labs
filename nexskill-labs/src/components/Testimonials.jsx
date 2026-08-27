import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "../data/site";

export default function Testimonials() {
  return (
    <section className="section container-px">
      <p className="eyebrow mb-3">Success stories</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 max-w-xl">
        What our interns say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 } }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.name}>
            <blockquote className="card h-full p-8">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="mb-4">
                <path
                  d="M0 22V13.2C0 5.9 4.6 1 12 0v4.4c-4 .9-6.6 3.5-7 7.4H12V22H0Zm16 0V13.2C16 5.9 20.6 1 28 0v4.4c-4 .9-6.6 3.5-7 7.4h7V22H16Z"
                  fill="#7C3AED"
                />
              </svg>
              <p className="text-paper/85 leading-relaxed">{t.quote}</p>
              <footer className="mt-6">
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </footer>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
