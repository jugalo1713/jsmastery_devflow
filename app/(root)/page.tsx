import { auth, signOut } from "@/auth";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
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
    u8pvotes: 15,
    answers: 8,
    ciews: 250,
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
    u8pvotes: 20,
    answers: 12,
    ciews: 300,
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
    u8pvotes: 30,
    answers: 10,
    ciews: 400,
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
    u8pvotes: 25,
    answers: 7,
    ciews: 350,
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
    u8pvotes: 18,
    answers: 6,
    ciews: 220,
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
    u8pvotes: 12,
    answers: 4,
    ciews: 180,
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
    u8pvotes: 22,
    answers: 9,
    ciews: 320,
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
    u8pvotes: 28,
    answers: 11,
    ciews: 370,
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
    u8pvotes: 35,
    answers: 15,
    ciews: 500,
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
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
}
