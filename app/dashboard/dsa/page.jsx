"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const sections = [
  {
    title: "Learn the basics",
    count: 31,
    questions: ["Variables & Data Types", "Complexity Analysis", "Basic I/O"],
  },
  {
    title: "Learn Important Sorting Techniques",
    count: 7,
    questions: ["Bubble, Selection, Insertion", "Merge Sort"],
  },
  {
    title: "Solve Problems on Arrays [Easy -> Medium -> Hard]",
    count: 40,
    questions: ["Two Sum", "Subarray Sums", "Merge Intervals"],
  },
  {
    title: "Binary Search [1D, 2D Arrays, Search Space]",
    count: 32,
    questions: ["Classic Binary Search", "Search in Rotated Array"],
  },
  {
    title: "Strings [Basic and Medium]",
    count: 15,
    questions: ["Reverse Strings", "Substring Search"],
  },
  {
    title:
      "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]",
    count: 31,
    questions: ["Reverse Linked List", "Detect Cycle"],
  },
  {
    title: "Recursion [PatternWise]",
    count: 25,
    questions: ["Fibonacci", "Backtracking Basics"],
  },
];

const STORAGE_KEY = "dsa_questions_v1";

const DsaPage = () => {
  const [data, setData] = useState({});
  const [openForm, setOpenForm] = useState(null);
  const [form, setForm] = useState({
    title: "",
    url: "",
    platform: "LeetCode",
  });

  // Load data from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
      } else {
        const init = {};
        sections.forEach((s) => {
          init[s.title] = s.questions.map((q) => ({
            title: q,
            url: "",
            platform: "",
          }));
        });
        setData(init);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      }
    } catch (e) {
      console.error("Failed to load DSA questions", e);
    }
  }, []);

  const saveData = (next) => {
    setData(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save DSA questions", e);
    }
  };

  const handleAdd = (sectionTitle) => {
    if (!form.title.trim()) return;

    const next = { ...data };
    const entry = {
      title: form.title.trim(),
      url: form.url.trim(),
      platform: form.platform,
    };

    next[sectionTitle] = next[sectionTitle]
      ? [entry, ...next[sectionTitle]]
      : [entry];

    saveData(next);
    setForm({ title: "", url: "", platform: "LeetCode" });
    setOpenForm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-pink-400 text-transparent bg-clip-text">
            DSA Roadmap
          </h1>
          <p className="text-gray-300 mt-1">
            Structured DSA topics and practice questions
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-cyan-300/10">
          {/* Progress Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center text-black font-bold">
                0%
              </div>
              <div>
                <div className="text-sm text-gray-300">
                  Overall Progress
                </div>
                <div className="text-lg font-semibold">0 / 454</div>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              <span className="inline-block mr-4">
                Easy 0/132
              </span>
              <span className="inline-block mr-4">
                Medium 0/150
              </span>
              <span>Hard 0/172</span>
            </div>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible>
            {sections.map((s, i) => (
              <AccordionItem value={`item-${i}`} key={s.title}>
                <AccordionTrigger className="flex items-center justify-between">
                  <span className="font-medium">{s.title}</span>
                  <span className="text-sm text-gray-300">
                    {data[s.title]
                      ? `${data[s.title].length} / ${s.count}`
                      : `0 / ${s.count}`}
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  {/* Add Button */}
                  <div className="flex justify-end mb-3">
                    <button
                      onClick={() =>
                        setOpenForm(
                          openForm === s.title ? null : s.title
                        )
                      }
                      className="text-sm bg-cyan-600 px-3 py-1 rounded-md"
                    >
                      {openForm === s.title
                        ? "Cancel"
                        : "Add Question"}
                    </button>
                  </div>

                  {/* Form */}
                  {openForm === s.title && (
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        className="p-2 rounded-md bg-white/5"
                        placeholder="Question title"
                        value={form.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="p-2 rounded-md bg-white/5"
                        placeholder="Reference URL"
                        value={form.url}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            url: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <select
                          className="p-2 rounded-md bg-white/5 w-1/2"
                          value={form.platform}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              platform: e.target.value,
                            })
                          }
                        >
                          <option>LeetCode</option>
                          <option>GFG</option>
                          <option>Other</option>
                        </select>
                        <button
                          onClick={() => handleAdd(s.title)}
                          className="px-3 py-2 bg-emerald-500 rounded-md"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(data[s.title] || []).map((q, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-md bg-white/5 flex justify-between"
                      >
                        <div>
                          {q.url ? (
                            <a
                              href={q.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline"
                            >
                              {q.title}
                            </a>
                          ) : (
                            <span>{q.title}</span>
                          )}
                          {q.platform && (
                            <span className="ml-3 text-xs text-gray-400">
                              • {q.platform}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DsaPage;
