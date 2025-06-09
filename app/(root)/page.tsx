import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { api } from "@/lib/api";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import Link from "next/link";

const questions = [
  {
    _id: 2,
    title: "What is the best way to manage state in React?",
    tags: [
      { _id: 4, name: "React" },
      { _id: 5, name: "State Management" },
      { _id: 6, name: "Redux" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 15,
    answers: 8,
    views: 250,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "How do I center a div using CSS?",
    tags: [
      { _id: 7, name: "CSS" },
      { _id: 8, name: "HTML" },
      { _id: 9, name: "Flexbox" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 20,
    answers: 12,
    views: 300,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title:
      "What are the differences between var, let, and const in JavaScript?",
    tags: [
      { _id: 10, name: "JavaScript" },
      { _id: 11, name: "ES6" },
      { _id: 12, name: "Variables" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 30,
    answers: 10,
    views: 400,
    createdAt: new Date(),
  },
  {
    _id: 5,
    title: "How can I improve the performance of my React application?",
    tags: [
      { _id: 13, name: "React" },
      { _id: 14, name: "Performance" },
      { _id: 15, name: "Optimization" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 25,
    answers: 7,
    views: 350,
    createdAt: new Date(),
  },
  {
    _id: 6,
    title: "What is the difference between inline-block and block in CSS?",
    tags: [
      { _id: 16, name: "CSS" },
      { _id: 17, name: "Display" },
      { _id: 18, name: "HTML" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 18,
    answers: 6,
    views: 220,
    createdAt: new Date(),
  },
  {
    _id: 7,
    title: "How do I fetch data from an API in React?",
    tags: [
      { _id: 19, name: "React" },
      { _id: 20, name: "API" },
      { _id: 21, name: "Fetch" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 12,
    answers: 4,
    views: 180,
    createdAt: new Date(),
  },
  {
    _id: 8,
    title: "What is the difference between == and === in JavaScript?",
    tags: [
      { _id: 22, name: "JavaScript" },
      { _id: 23, name: "Equality" },
      { _id: 24, name: "Operators" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 22,
    answers: 9,
    views: 320,
    createdAt: new Date(),
  },
  {
    _id: 9,
    title: "How do I create a responsive layout using CSS Grid?",
    tags: [
      { _id: 25, name: "CSS" },
      { _id: 26, name: "Grid" },
      { _id: 27, name: "Responsive Design" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 28,
    answers: 11,
    views: 370,
    createdAt: new Date(),
  },
  {
    _id: 10,
    title: "What are React hooks and how do I use them?",
    tags: [
      { _id: 28, name: "React" },
      { _id: 29, name: "Hooks" },
      { _id: 30, name: "State Management" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      image: "/icons/avatar.svg",
    },
    upvotes: 35,
    answers: 15,
    views: 500,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc={"/icons/search.svg"}
          placeHolder="Search questions..."
          otherClasses="flex-1"
          route="/"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}
