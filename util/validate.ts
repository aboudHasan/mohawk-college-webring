import fs from "node:fs";
import path from "node:path";

import {
  techFiltersArray,
  jobFiltersArray,
  yearFiltersArray,
  Member,
} from "../webring/src/types";

const membersFilePath = path.join(process.cwd(), "members.json");
let membersData: Member[];

try {
  const rawData = fs.readFileSync(membersFilePath, "utf-8");
  membersData = JSON.parse(rawData);
} catch (error) {
  console.error(
    "Failed to read or parse members.json. Check the syntax.\n",
    error,
  );
  process.exit(1);
}

if (!Array.isArray(membersData) || membersData.length === 0) {
  console.error("members.json is empty or not formatted correctly.");
  process.exit(1);
}

const newMember = membersData[membersData.length - 1];
let hasError = false;
if (!newMember.name || typeof newMember.name !== "string") {
  console.error(
    "The member object must include a valid 'name' property of type string.",
  );
  hasError = true;
}

if (!newMember.url || typeof newMember.url !== "string") {
  console.error(
    "The member object must include a valid 'url' property of type string.",
  );
  hasError = true;
}

if (
  !jobFiltersArray.includes(
    newMember.jobStatus as unknown as (typeof jobFiltersArray)[number],
  )
) {
  console.error(`Invalid jobStatus property: "${newMember.jobStatus}".`);
  console.error(`\nAccepted values are: ${jobFiltersArray.join(", ")}`);
  hasError = true;
}

if (
  !yearFiltersArray.includes(
    newMember.graduationYear as unknown as (typeof yearFiltersArray)[number],
  )
) {
  console.error(
    `Invalid graduationYear property: "${newMember.graduationYear}".`,
  );
  console.error(
    `Accepted values are: ${yearFiltersArray.join(", ")}\n\nIf this doesn't seem right, please update yearFiltersArray in types.ts`,
  );
  hasError = true;
}

if (!Array.isArray(newMember.tags)) {
  console.error("The 'tags' property must be an array of TechFilters.");
  hasError = true;
} else {
  for (const tag of newMember.tags) {
    if (
      !techFiltersArray.includes(
        tag as unknown as (typeof techFiltersArray)[number],
      )
    ) {
      console.error(`Unrecognized technology: "${tag}".`);
      console.error(
        `\nIf you meant to add a new technology, you must also add it to the 'techFiltersArray' in 'types.ts'.`,
      );
      hasError = true;
    }
  }
}

if (hasError) {
  console.error(
    "\nPull request rejected because one or more validation checks failed. Please review the errors above, correct them in your local branch, and push the changes to automatically run this check again.",
  );
  process.exit(1);
}

console.log(
  "\n Pull request approved. A human will check one last time and merge your pull request soon. Thank you",
);
process.exit(0);
