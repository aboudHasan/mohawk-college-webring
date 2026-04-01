# Mohawk College Webring

Welcome to the Mohawk College Webring! This project is a community-driven directory that connects the personal websites, portfolios, and blogs of Mohawk College students and alumni.

## What is a Webring?

A webring is a collection of websites linked together in a circular structure. By joining this webring, you integrate your personal site into a continuous loop of fellow Mohawk College peers. This allows visitors to organically discover what other students are building by navigating from your site to the "next" or "previous" site in the ring, driving traffic to your portfolio and fostering a stronger developer community.

## How to Join

To add your website to the webring, you must submit a Pull Request to this repository. Please follow these strict rules to ensure your submission is processed smoothly:

### 1. Modify the Members List

All members are tracked within the `members.json` file.

- **Placement:** You **must** add your member object to the **absolute end** of t# Mohawk College Webring

Welcome to the Mohawk College Webring! This project is a community-driven directory that connects the personal websites, portfolios, and blogs of Mohawk College students and alumni.

## What is a Webring?

A webring is a collection of websites linked together in a circular structure. By joining this webring, you integrate portfolio into a continuous loop with fellow Mohawk College peers. This allows users to organically discover and filter student portfolio sites, fostering a stronger developer community.

## How to Join

To add your website to the webring, you must submit a pull request to this repository. Please follow these rules to ensure your submission is processed smoothly and quickly:

### 1. Modify the Members List

All members are tracked within the `members.json` file.

- **Placement:** You **must** add your member object to the **absolute end** of the JSON array. This ensures that the validation scripts run smoothly, and the navigation acts as a webring should.
- **Valid JSON:** Double-check that you do not break the overall JSON syntax (e.g. watch out for missing commas or unclosed brackets).

### 2. Include Required Fields

Your member object must include the following valid properties. Be sure that the values for your properties match the type definitions found in `webring/src/types.ts`

- `name`: Your full name or preferred moniker.
- `url`: The direct link to your personal website or portfolio.
- `jobStatus`: Your current employment or search status.
- `graduationYear`: The year you graduated or intend to graduate.
- `tags`: An array of strings representing the technologies you work with.

### 3. Match the Strict Type Definitions

To maintain consistent filtering on the front end, your data must align with the definitions in the codebase.

- **Job & Year:** Your `jobStatus` and `graduationYear` properties must perfectly match the exact strings/numbers allowed in `webring/src/types.ts`.
- **Tech Tags:** All technologies listed in your `tags` property must exist exactly as written in the `techFiltersArray` located inside `webring/src/types.ts`.

### 4. Adding New Filter Tags (If Applicable)

If you need to introduce a new technology tag or a graduation year that is not currently listed, you are absolutely encouraged to do so. However, you must also modify `webring/src/types.ts` to add your new tag to the `techFiltersArray` or the relevant type unions as part of your pull request.

### 5. The Optional Email Property

You may optionally add an `email` property to your member object.

- **Opting In:** By including your email, you are opting in to receive an automated notification whenever a new member is added to the webring. The purpose of this is to allow established members to visit new portfolios and provide constructive feedback to the student.
- **Opting Out:** If you wish to stop receiving these emails in the future, you can open a new pull request to remove the `email` property from your object, or contact a repository maintainer to do it for you in the next commit.

### 6. Add the Widget to Your Site

For the webring to function, you should provide the "Next" and "Previous" navigation links on your portfolio, and ideally a link to the webring landing page itself.

Here is an example of what your HTML `href` tags should look like (make sure to replace the parameter in the `?from=` query with your actual website URL):

```html
<a
  href="[https://mohawk-college-webring.vercel.app/api/next?from=https://aboudhasan.tech](https://mohawk-college-webring.vercel.app/api/next?from=https://aboudhasan.tech)"
>
  Next
</a>

<a
  href="[https://mohawk-college-webring.vercel.app/api/previous?from=https://aboudhasan.tech](https://mohawk-college-webring.vercel.app/api/previous?from=https://aboudhasan.tech)"
>
  Previous
</a>
```

**Future Plans for the Widget:** Currently, the widget relies on simple text labels like 'Next', 'Previous', and 'Mohawk Webring'. In the future, we hope to have an official webring logo for the main link and have SVG arrows for the navigation links. This will allow you to embed a much more visually appealing widget on your portfolio.
he JSON array. This ensures the chronological integrity of the webring's navigational loop.
