"use client";

import { useState, useEffect } from "react";
import LoginModal from "@/components/LoginModal";
import { useAuthStore } from "../store/useAuthStore";
import { onAuthChanged } from "../app/library/auth";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import {
  FadeInItem,
  FadeUpSlowItem,
  FadeUpFastItem,
  FadeColorItem,
} from "./UI/Animations";
import Footer from "./footer";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthChanged(setUser);
    return () => unsubscribe();
  }, [setUser]);

  return (
    <>
      {/* <nav className="p-4 flex justify-between items-center bg-gray-100">
        <div>
          {user ? (
            <span>Welcome, {user.email}</span>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="rounded bg-black px-4 py-2 text-white"
            >
              Login
            </button>
          )}
        </div>
      </nav> */}
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img
              className="nav__img"
              src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
              alt="logo"
            />
          </figure>
          <ul className="nav__list--wrapper">
            <li
              className="nav__list nav__list--login"
              onClick={() => setIsLoginOpen(true)}
              style={{ cursor: "pointer" }}
            >
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <FadeInItem>
                  <div className="landing__content__title">
                    Gain more knowledge <br className="remove--tablet" />
                    in less time
                  </div>
                </FadeInItem>
                <FadeInItem>
                  <FadeUpSlowItem className="z-1">
                    <div className="landing__content__subtitle">
                      Great summaries for busy people,
                      <br className="remove--tablet" />
                      individuals who barely have time to read,
                      <br className="remove--tablet" />
                      and even people who don’t like to read.
                    </div>
                  </FadeUpSlowItem>
                </FadeInItem>
                <button
                  className="btn home__cta--btn relative z-10"
                  onClick={() => setIsLoginOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </button>
              </div>
              <FadeInItem>
                <figure className="landing__image--mask">
                  <img
                    src="https://summarist.vercel.app/_next/static/media/landing.e4787d01.png"
                    alt="landing"
                  />
                </figure>
              </FadeInItem>
            </div>
          </div>
        </div>
      </section>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Understand books in a few minutes
            </div>
            <FadeUpSlowItem>
              <div className="features__wrapper">
                <div className="features">
                  <div className="features__icon">
                    <AiFillFileText />
                  </div>
                  <div className="features__title">Read or listen</div>
                  <div className="features__sub--title">
                    Save time by getting the core ideas from the best books.
                  </div>
                </div>
                <div className="features">
                  <div className="features__icon">
                    <AiFillBulb />
                  </div>
                  <div className="features__title">Find your next read</div>
                  <div className="features__sub--title">
                    Explore book lists and personalized recommendations.
                  </div>
                </div>
                <div className="features">
                  <div className="features__icon">
                    <AiFillAudio />
                  </div>
                  <div className="features__title">Briefcasts</div>
                  <div className="features__sub--title">
                    Gain valuable insights from briefcasts
                  </div>
                </div>
              </div>
            </FadeUpSlowItem>
            <div className="statistics__wrapper">
              <div className="statistics__content--header">
                <FadeColorItem delay="10">
                  <div className="color-animate">Enhance your knowledge</div>
                </FadeColorItem>
                <FadeColorItem delay="20">
                  <div className="color-animate-1">Achieve greater success</div>
                </FadeColorItem>
                <FadeColorItem delay="30">
                  <div className="color-animate-2">Improve your health</div>
                </FadeColorItem>
                <FadeColorItem delay="40">
                  <div className="color-animate-3">
                    Develop better parenting skills
                  </div>
                </FadeColorItem>
                <FadeColorItem delay="50">
                  <div className="color-animate-4">Increase happiness</div>
                </FadeColorItem>
                <FadeColorItem delay="60">
                  <div className="color-animate-5">
                    Be the best version of yourself!
                  </div>
                </FadeColorItem>
              </div>
              <div className="statistics__content--details">
                <div className="statistics__data">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>
            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <div className="statistics__data">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>report feeling more productive</b>{" "}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--title">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--header statistics__content--header-second">
                <FadeColorItem delay="10">
                  <div className="color-animate">Expand your learning</div>
                </FadeColorItem>
                <FadeColorItem delay="20">
                  <div className="color-animate-1">Accomplish your goals</div>
                </FadeColorItem>
                <FadeColorItem delay="30">
                  <div className="color-animate-2">
                    Strengthen your vitality
                  </div>
                </FadeColorItem>
                <FadeColorItem delay="40">
                  <div className="color-animate-3">
                    Become a better caregiver
                  </div>
                </FadeColorItem>
                <FadeColorItem delay="50">
                  <div className="color-animate-4">Improve your mood</div>
                </FadeColorItem>
                <FadeColorItem delay="60">
                  <div className="color-animate-5">Maximize your abilities</div>
                </FadeColorItem>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              <FadeInItem delay="0">
                <div className="review">
                  <div className="review__header">
                    <div className="review__name">Hanna M.</div>
                    <div className="review__stars flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                  </div>
                  <div className="review__body">
                    This app has been a <b>game-changer</b> for me! It's saved
                    me so much time and effort in reading and comprehending
                    books. Highly recommend it to all book lovers.
                  </div>
                </div>
              </FadeInItem>
              <FadeInItem delay="150">
                <div className="review">
                  <div className="review__header">
                    <div className="review__name">David B.</div>
                    <div className="review__stars flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                  </div>
                  <div className="review__body">
                    I love this app! It provides
                    <b>concise and accurate summaries</b> of books in a way that
                    is easy to understand. It's also very user-friendly and
                    intuitive.
                  </div>
                </div>
              </FadeInItem>
              <FadeInItem delay="200">
                <div className="review">
                  <div className="review__header">
                    <div className="review__name">Nathan S.</div>
                    <div className="review__stars flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                  </div>
                  <div className="review__body">
                    This app is a great way to get the main takeaways from a
                    book without having to read the entire thing.
                    <b>The summaries are well-written and informative.</b>
                    Definitely worth downloading.
                  </div>
                </div>
              </FadeInItem>
              <FadeInItem delay="250">
                <div className="review">
                  <div className="review__header">
                    <div className="review__name">Ryan R.</div>
                    <div className="review__stars flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                  </div>
                  <div className="review__body">
                    If you're a busy person who
                    <b>loves reading but doesn't have the time</b> to read every
                    book in full, this app is for you! The summaries are
                    thorough and provide a great overview of the book's content.
                  </div>
                </div>
              </FadeInItem>
            </div>
            <div className="reviews__btn--wrapper">
              <button
                className="btn home__cta--btn"
                onClick={() => setIsLoginOpen(true)}
                style={{ cursor: "pointer" }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Start growing with Summarist now
            </div>
            <div className="numbers__wrapper">
              <FadeUpFastItem delay="100">
                <div className="numbers">
                  <div className="numbers__icon">
                    <BiCrown />
                  </div>
                  <div className="numbers__title">3 Million</div>
                  <div className="numbers__sub--title">
                    Downloads on all platforms
                  </div>
                </div>
              </FadeUpFastItem>
              <FadeUpFastItem delay="200">
                <div className="numbers">
                  <div className="numbers__icon numbers__star--icon">
                    <div className="review__stars flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                    <BsStarHalf />
                  </div>
                  <div className="numbers__title">4.5 Stars</div>
                  <div className="numbers__sub--title">
                    Average ratings on iOS and Google Play
                  </div>
                </div>
              </FadeUpFastItem>
              <FadeUpFastItem delay="300">
                <div className="numbers">
                  <div className="numbers__icon">
                    <RiLeafLine />
                  </div>
                  <div className="numbers__title">97%</div>
                  <div className="numbers__sub--title">
                    Of Summarist members create a better reading habit
                  </div>
                </div>
              </FadeUpFastItem>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
