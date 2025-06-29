/*import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview works."
        />
      </Head>
      <main className="bg-gray-300 p-8 mt-10">
        <h1 className="text-4xl font-bold text-center text-black mb-8">How It Works</h1>
        <section className="space-y-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
                  Step 1: Prepare for the Interview
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700 text-black">
                  Get ready by selecting the type of interview and providing
                  some details about the job position.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                {" "}
                <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
                  Step 2: Start the AI Interview
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700 ">
                  Our AI will ask you a series of questions and evaluate your
                  responses in real-time.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <h2 className="text-xl md:text-2xl text-black font-semibold mb-4">
                  Step 3: Receive Feedback
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">
                  Get detailed feedback on your performance, including strengths
                  and areas for improvement.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;*/

import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview works."
        />
      </Head>

      <main className="bg-gray-900 min-h-screen px-6 md:px-20 py-16">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-12 tracking-wide">
          How It Works
        </h1>

        {/* Steps Section */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {/* Step 1 */}
            <AccordionItem value="item-1" className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <AccordionTrigger className="p-4 text-left hover:bg-gray-700 transition-all">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Step 1: Prepare for the Interview
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
                Get ready by selecting the type of interview and providing
                some details about the job position.
              </AccordionContent>
            </AccordionItem>

            {/* Step 2 */}
            <AccordionItem value="item-2" className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <AccordionTrigger className="p-4 text-left hover:bg-gray-700 transition-all">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Step 2: Start the AI Interview
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
                Our AI will ask you a series of questions and evaluate your
                responses in real-time.
              </AccordionContent>
            </AccordionItem>

            {/* Step 3 */}
            <AccordionItem value="item-3" className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <AccordionTrigger className="p-4 text-left hover:bg-gray-700 transition-all">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Step 3: Receive Feedback
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
                Get detailed feedback on your performance, including strengths
                and areas for improvement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;

