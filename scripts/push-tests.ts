import { avenTestCases } from "../aven-test-cases-array";
import { env } from "../lib/env";

console.log(avenTestCases);

interface FormattedTest {
  scorers: {
    type: string;
    rubric: string;
  }[];
  type: string;
  script: string;
  numAttempts: number;
  name: string;
}

async function pushTests(test: FormattedTest) {
  console.log(`Test: ${test.name}`);
  console.log("--------------------------------");
  const postData = await fetch(
    `https://api.vapi.ai/test-suite/${env.VAPI_TEST_SUITE_ID}/test`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.VAPI_PRIVATE_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(test),
    }
  );

  const data = await postData.json();
  console.log(data);
}

function main() {
  avenTestCases.forEach(async (test) => {
    const formattedTest = {
      scorers: [
        {
          type: "ai",
          rubric: test.rubric,
        },
      ],
      type: "voice",
      script: test.script,
      numAttempts: 1,
      name: test.name,
    };
    pushTests(formattedTest);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
}

main();
